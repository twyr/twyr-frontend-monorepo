import React from 'react';
import { Popover as TamaguiPopover } from 'tamagui';

type Props = {
	trigger: React.ReactNode;
	children: React.ReactNode;
};

export function Popover({ trigger, children }: Props) {
	return (
		<TamaguiPopover placement="bottom">
			<TamaguiPopover.Trigger asChild>{trigger}</TamaguiPopover.Trigger>
			<TamaguiPopover.Content
				borderWidth={1}
				borderColor="$borderColor"
				backgroundColor="$background"
			>
				{children}
			</TamaguiPopover.Content>
		</TamaguiPopover>
	);
}
