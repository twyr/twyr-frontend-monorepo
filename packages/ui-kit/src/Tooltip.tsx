import React from 'react';
import { Tooltip as TamaguiTooltip } from 'tamagui';

type Props = {
	content: React.ReactNode;
	children: React.ReactNode;
};

export function Tooltip({ content, children }: Props) {
	return (
		<TamaguiTooltip>
			<TamaguiTooltip.Trigger asChild>{children}</TamaguiTooltip.Trigger>
			<TamaguiTooltip.Content
				enterStyle={{ y: -4, opacity: 0 }}
				exitStyle={{ y: -4, opacity: 0 }}
			>
				{content}
			</TamaguiTooltip.Content>
		</TamaguiTooltip>
	);
}
