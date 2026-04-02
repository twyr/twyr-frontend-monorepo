import React from 'react';
import { Button, CalendarIcon, Dialog, Select } from '@twyr/ui-kit';
import {
	formatDateOnlyValue,
	getTodayDateOnlyValue,
	parseDateOnlyValue
} from '@twyr/core';
import { useTwyrTranslation } from '@twyr/i18n';
import { Paragraph, Text, XStack, YStack } from 'tamagui';

type Props = {
	value?: string;
	onChange?: (value: string) => void;
	label?: string;
	hideLabel?: boolean;
};

type DateParts = {
	year: string;
	month: string;
	day: string;
};

const MONTH_OPTIONS = [
	{ value: '01', label: 'January' },
	{ value: '02', label: 'February' },
	{ value: '03', label: 'March' },
	{ value: '04', label: 'April' },
	{ value: '05', label: 'May' },
	{ value: '06', label: 'June' },
	{ value: '07', label: 'July' },
	{ value: '08', label: 'August' },
	{ value: '09', label: 'September' },
	{ value: '10', label: 'October' },
	{ value: '11', label: 'November' },
	{ value: '12', label: 'December' }
];

export function DatePicker({
	value,
	onChange,
	label,
	hideLabel = false
}: Props) {
	const { t } = useTwyrTranslation();
	const [open, setOpen] = React.useState(false);
	const [draft, setDraft] = React.useState<DateParts>(() =>
		createDraftFromValue(value)
	);
	const selectedDate = value?.trim() ? value.trim() : '';
	const displayValue = selectedDate
		? formatHumanFriendlyDate(selectedDate)
		: t('common.placeholders.date');
	const currentYear = new Date().getFullYear();
	const yearOptions = React.useMemo(
		() =>
			Array.from({ length: 121 }, (_, index) => {
				const year = currentYear - index;
				return {
					label: String(year),
					value: String(year)
				};
			}),
		[currentYear]
	);
	const dayOptions = React.useMemo(() => {
		const year = Number(draft.year);
		const month = Number(draft.month);

		if (!year || !month) {
			return [];
		}

		const totalDays = new Date(year, month, 0).getDate();

		return Array.from({ length: totalDays }, (_, index) => {
			const day = String(index + 1).padStart(2, '0');
			return {
				label: day,
				value: day
			};
		});
	}, [draft.month, draft.year]);

	React.useEffect(() => {
		setDraft(createDraftFromValue(value));
	}, [value]);

	return (
		<YStack gap="$2">
			{hideLabel ? null : (
				<Paragraph size="$2" color="$colorMuted">
					{label ?? t('common.placeholders.date')}
				</Paragraph>
			)}
			<Button
				tone="neutral"
				width="100%"
				backgroundColor="$backgroundSoft"
				borderColor="$borderColor"
				borderWidth={1}
				borderRadius="$4"
				hoverStyle={{ backgroundColor: '$backgroundHover' }}
				pressStyle={{ backgroundColor: '$backgroundPress' }}
				focusStyle={{ borderColor: '$primary' }}
				onPress={() => {
					setDraft(createDraftFromValue(selectedDate));
					setOpen(true);
				}}
			>
				<XStack
					width="100%"
					alignItems="center"
					justifyContent="space-between"
					gap="$2"
				>
					<Text color={selectedDate ? '$color' : '$colorSoft'}>
						{displayValue}
					</Text>
					<CalendarIcon size={18} />
				</XStack>
			</Button>
			<Dialog
				open={open}
				onOpenChange={(nextOpen) => {
					setOpen(nextOpen);
					if (nextOpen) {
						setDraft(createDraftFromValue(selectedDate));
					}
				}}
				title={t('common.placeholders.date')}
				description={t('datePicker.description')}
				confirmLabel={t('common.actions.apply')}
				cancelLabel={t('common.actions.cancel')}
				confirmDisabled={!draft.year || !draft.month || !draft.day}
				onConfirm={() => {
					if (!draft.year || !draft.month || !draft.day) {
						return;
					}

					const nextValue = formatDateOnlyValue(
						new Date(
							Number(draft.year),
							Number(draft.month) - 1,
							Number(draft.day)
						)
					);
					onChange?.(nextValue);
					setOpen(false);
				}}
			>
				<YStack gap="$3">
					<XStack gap="$3" flexWrap="nowrap" alignItems="flex-start">
						<YStack flex={0.8} minWidth={88}>
							<Select
								value={draft.day}
								onValueChange={(nextDay) => {
									setDraft((current) => ({
										...current,
										day: nextDay
									}));
								}}
								options={dayOptions}
								placeholder={t('common.placeholders.day')}
							/>
						</YStack>
						<YStack flex={1.7} minWidth={150}>
							<Select
								value={draft.month}
								onValueChange={(nextMonth) => {
									setDraft((current) => {
										const nextDraft = {
											...current,
											month: nextMonth
										};
										const maxDay = getMaxDay(nextDraft);
										if (
											nextDraft.day &&
											Number(nextDraft.day) > maxDay
										) {
											nextDraft.day = String(
												maxDay
											).padStart(2, '0');
										}

										return nextDraft;
									});
								}}
								options={MONTH_OPTIONS}
								placeholder={t('common.placeholders.month')}
							/>
						</YStack>
						<YStack flex={1} minWidth={110}>
							<Select
								value={draft.year}
								onValueChange={(nextYear) => {
									setDraft((current) => {
										const nextDraft = {
											...current,
											year: nextYear
										};
										const maxDay = getMaxDay(nextDraft);
										if (
											nextDraft.day &&
											Number(nextDraft.day) > maxDay
										) {
											nextDraft.day = String(
												maxDay
											).padStart(2, '0');
										}

										return nextDraft;
									});
								}}
								options={yearOptions}
								placeholder={t('common.placeholders.year')}
							/>
						</YStack>
					</XStack>
					<XStack
						justifyContent="space-between"
						gap="$2"
						flexWrap="wrap"
					>
						<Button
							tone="neutral"
							chromeless
							onPress={() => {
								setDraft(
									createDraftFromValue(
										getTodayDateOnlyValue()
									)
								);
							}}
						>
							{t('common.actions.useToday')}
						</Button>
					</XStack>
				</YStack>
			</Dialog>
		</YStack>
	);
}

function createDraftFromValue(value?: string): DateParts {
	const parsedValue = parseDateOnlyValue(value?.trim() ?? '');
	const resolvedDate = parsedValue ?? new Date();

	return {
		year: String(resolvedDate.getFullYear()),
		month: String(resolvedDate.getMonth() + 1).padStart(2, '0'),
		day: String(resolvedDate.getDate()).padStart(2, '0')
	};
}

function getMaxDay(value: DateParts) {
	const year = Number(value.year);
	const month = Number(value.month);

	if (!year || !month) {
		return 31;
	}

	return new Date(year, month, 0).getDate();
}

function formatHumanFriendlyDate(value: string) {
	const parsedValue = parseDateOnlyValue(value);

	if (!parsedValue) {
		return value;
	}

	const day = parsedValue.getDate();
	const month = parsedValue.toLocaleString(undefined, {
		month: 'long'
	});
	const year = parsedValue.getFullYear();

	return `${formatOrdinal(day)} ${month} ${year}`;
}

function formatOrdinal(value: number) {
	const remainder = value % 100;

	if (remainder >= 11 && remainder <= 13) {
		return `${value}th`;
	}

	switch (value % 10) {
		case 1:
			return `${value}st`;
		case 2:
			return `${value}nd`;
		case 3:
			return `${value}rd`;
		default:
			return `${value}th`;
	}
}
