import React from 'react';
import { surfaceElevations } from '@twyr/design-system';
import { GetProps, Popover as TamaguiPopover } from 'tamagui';

type Props = {
	trigger: React.ReactNode;
	children: React.ReactNode;
	contentProps?: GetProps<typeof TamaguiPopover.Content>;
};

export function Popover({ trigger, children, contentProps }: Props) {
	return (
		<TamaguiPopover placement="bottom">
			<TamaguiPopover.Trigger asChild>{trigger}</TamaguiPopover.Trigger>
			<TamaguiPopover.Content
				borderWidth={1}
				borderColor="$borderColor"
				backgroundColor="$background"
				{...surfaceElevations.sm}
				{...contentProps}
			>
				{children}
			</TamaguiPopover.Content>
		</TamaguiPopover>
	);
}
