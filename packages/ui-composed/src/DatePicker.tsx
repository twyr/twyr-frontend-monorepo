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

const MONTH_VALUES = [
	'01',
	'02',
	'03',
	'04',
	'05',
	'06',
	'07',
	'08',
	'09',
	'10',
	'11',
	'12'
] as const;

export function DatePicker({
	value,
	onChange,
	label,
	hideLabel = false
}: Props) {
	const { t, i18n } = useTwyrTranslation();
	const [open, setOpen] = React.useState(false);
	const [draft, setDraft] = React.useState<DateParts>(() =>
		createDraftFromValue(value)
	);
	const activeLocale = i18n.resolvedLanguage || i18n.language;
	const selectedDate = value?.trim() ? value.trim() : '';
	const displayValue = selectedDate
		? formatHumanFriendlyDate(selectedDate, activeLocale)
		: t('common.placeholders.date');
	const monthOptions = React.useMemo(
		() =>
			MONTH_VALUES.map((month) => ({
				value: month,
				label: t(`datePicker.months.${month}`)
			})),
		[activeLocale, t]
	);
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
								options={monthOptions}
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

function formatHumanFriendlyDate(value: string, locale?: string) {
	const parsedValue = parseDateOnlyValue(value);

	if (!parsedValue) {
		return value;
	}

	try {
		return new Intl.DateTimeFormat(locale, {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(parsedValue);
	} catch {
		return new Intl.DateTimeFormat(undefined, {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(parsedValue);
	}
}
