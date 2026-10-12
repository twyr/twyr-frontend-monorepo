import { useState } from 'react';
import type { AppLanguageCode } from '@twyr/core';
import { useTwyrTranslation } from '@twyr/i18n';
import { Button, LanguageIcon, Popover, Tooltip } from '@twyr/ui-kit';
import { Text, YStack, Paragraph } from 'tamagui';

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
			variant="quiet"
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
		<Tooltip scope="language-menu-hint">
			<Popover open={open} onOpenChange={setOpen} placement="bottom">
				<Tooltip.Trigger scope="language-menu-hint" asChild>
					<Popover.Trigger asChild>{triggerButton}</Popover.Trigger>
				</Tooltip.Trigger>
				<Popover.Content padding={0} overflow="hidden">
					<YStack minWidth={180} gap={0}>
						{options.map((option) => (
							<Popover.Close key={option.code} asChild>
								<Button
									variant="quiet"
									backgroundColor={{
										default:
											option.code === value
												? 'backgroundSoft'
												: 'transparent',
										hover:
											option.code === value
												? 'backgroundSoft'
												: 'background-hover',
										press:
											option.code === value
												? 'backgroundSoft'
												: 'background-press'
									}}
									width="100%"
									borderRadius={0}
									paddingHorizontal="3"
									paddingVertical="2"
									minHeight={36}
									justifyContent="flex-start"
									onPress={() =>
										onChange(option.code as AppLanguageCode)
									}
								>
									<Text color="color">{option.label}</Text>
								</Button>
							</Popover.Close>
						))}
					</YStack>
				</Popover.Content>
			</Popover>
			<Tooltip.Content scope="language-menu-hint">
				<Paragraph>{t('common.tooltips.changeLanguage')}</Paragraph>
			</Tooltip.Content>
		</Tooltip>
	);
}
