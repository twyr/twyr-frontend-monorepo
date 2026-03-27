import React from 'react';
import { Sheet as TamaguiSheet } from 'tamagui';

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	children: React.ReactNode;
};

export function Sheet({ open, onOpenChange, children }: Props) {
	return (
		<TamaguiSheet
			modal
			open={open}
			onOpenChange={onOpenChange}
			snapPointsMode="fit"
			dismissOnOverlayPress
		>
			<TamaguiSheet.Overlay />
			<TamaguiSheet.Frame padding="$4">{children}</TamaguiSheet.Frame>
		</TamaguiSheet>
	);
}
