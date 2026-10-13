import { useEffect, useState } from 'react';
import { Paragraph } from 'tamagui';
import { Popover } from '@twyr/ui-kit';
import type { PortalMobileTooltipProps } from './PortalMobileTooltip';

export function PortalMobileTooltip({
	children,
	label,
	placement = 'bottom',
	disabled = false
}: PortalMobileTooltipProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [disabled, label]);

	useEffect(() => {
		if (!open) return;
		const timeout = setTimeout(() => setOpen(false), 3000);
		return () => clearTimeout(timeout);
	}, [open]);

	return (
		<Popover
			open={open && !disabled}
			onOpenChange={setOpen}
			placement={placement}
			offset={placement === 'right' ? 24 : 8}
			stayInFrame
			allowFlip
		>
			<Popover.Trigger
				asChild
				disablePressTrigger
				onLongPress={disabled ? undefined : () => setOpen(true)}
			>
				{children}
			</Popover.Trigger>
			<Popover.Content
				paddingHorizontal="3"
				paddingVertical="2"
				borderRadius="2"
				trapFocus={false}
				enableRemoveScroll={false}
			>
				<Paragraph
					fontSize="2"
					lineHeight="2"
					color="color"
					accessibilityLiveRegion="polite"
				>
					{label}
				</Paragraph>
			</Popover.Content>
		</Popover>
	);
}
