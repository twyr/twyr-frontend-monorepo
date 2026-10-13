import type { ReactElement } from 'react';
import { Paragraph } from 'tamagui';
import { Tooltip } from '@twyr/ui-kit';

type Props = {
	children: ReactElement;
	label: string;
	placement?: 'right' | 'bottom';
	disabled?: boolean;
};

export function PortalWebTooltip({
	children,
	label,
	placement = 'bottom',
	disabled = false
}: Props) {
	return (
		<Tooltip
			placement={placement}
			offset={placement === 'right' ? 24 : 8}
			delay={200}
			open={disabled ? false : undefined}
		>
			<Tooltip.Trigger asChild="web">{children}</Tooltip.Trigger>
			<Tooltip.Content paddingHorizontal="3" paddingVertical="2">
				<Paragraph fontSize="2" lineHeight="2" color="color">
					{label}
				</Paragraph>
			</Tooltip.Content>
		</Tooltip>
	);
}
