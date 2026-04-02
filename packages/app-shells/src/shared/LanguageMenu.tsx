import { useState } from 'react';
import type { AppLanguageCode } from '@twyr/core';
import { useTwyrTranslation } from '@twyr/i18n';
import { Button, LanguageIcon, Popover } from '@twyr/ui-kit';
import { Text, YStack, isWeb } from 'tamagui';

type LanguageOption = {
	code: string;
	label: string;
};

type Props = {
	value: AppLanguageCode;
	options: LanguageOption[];
	onChange: (value: AppLanguageCode) => void;
};

export function LanguageMenu({ value, options, onChange }: Props) {
	const { t } = useTwyrTranslation();
	const [open, setOpen] = useState(false);
	const triggerButton = (
		<Button
			chromeless
			width={48}
			height={40}
			padding={0}
			borderRadius={999}
			aria-label={t('common.tooltips.changeLanguage')}
		>
			<LanguageIcon color="currentColor" size={18} />
		</Button>
	);

	return (
		<Popover
			open={open}
			onOpenChange={setOpen}
			contentProps={{
				padding: 0,
				overflow: 'hidden'
			}}
			trigger={
				isWeb ? (
					<span
						title={t('common.tooltips.changeLanguage')}
						style={{ display: 'inline-flex' }}
					>
						{triggerButton}
					</span>
				) : (
					triggerButton
				)
			}
		>
			<YStack minWidth={180} gap={0}>
				{options.map((option) => (
					<Button
						key={option.code}
						chromeless
						backgroundColor={
							option.code === value
								? '$backgroundSoft'
								: 'transparent'
						}
						width="100%"
						borderRadius={0}
						paddingHorizontal="$3"
						paddingVertical="$2"
						minHeight={36}
						justifyContent="flex-start"
						hoverStyle={{
							backgroundColor:
								option.code === value
									? '$backgroundSoft'
									: '$backgroundHover'
						}}
						pressStyle={{
							backgroundColor:
								option.code === value
									? '$backgroundSoft'
									: '$backgroundPress'
						}}
						onPress={() => {
							onChange(option.code as AppLanguageCode);
							setOpen(false);
						}}
					>
						<Text color="currentColor">{option.label}</Text>
					</Button>
				))}
			</YStack>
		</Popover>
	);
}
