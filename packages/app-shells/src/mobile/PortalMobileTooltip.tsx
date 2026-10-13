import type { ReactElement } from 'react';
import { Paragraph } from 'tamagui';
import { Tooltip } from '@twyr/ui-kit';

export type PortalMobileTooltipProps = {
	children: ReactElement;
	label: string;
	placement?: 'right' | 'bottom';
	disabled?: boolean;
};

export function PortalMobileTooltip({
	children,
	label,
	placement = 'bottom',
	disabled = false
}: PortalMobileTooltipProps) {
	return (
		<Tooltip
			placement={placement}
			offset={placement === 'right' ? 24 : 8}
			delay={200}
			open={disabled ? false : undefined}
		>
			<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
			<Tooltip.Content paddingHorizontal="3" paddingVertical="2">
				<Paragraph fontSize="2" lineHeight="2" color="color">
					{label}
				</Paragraph>
			</Tooltip.Content>
		</Tooltip>
	);
}
