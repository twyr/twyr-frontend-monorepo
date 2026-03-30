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
			position={0}
			snapPoints={[70]}
			snapPointsMode="percent"
			dismissOnOverlayPress
		>
			<TamaguiSheet.Overlay />
			<TamaguiSheet.Handle />
			<TamaguiSheet.Frame padding="$4">{children}</TamaguiSheet.Frame>
		</TamaguiSheet>
	);
}
