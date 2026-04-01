import React from 'react';
import { surfaceElevations } from '@twyr/design-system';
import { Dialog as TamaguiDialog, Paragraph, XStack } from 'tamagui';
import { Button } from './Button';

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	children?: React.ReactNode;
	confirmLabel?: string;
	cancelLabel?: string;
	onConfirm?: () => void;
	confirmDisabled?: boolean;
};

export function Dialog({
	open,
	onOpenChange,
	title,
	description,
	children,
	confirmLabel = 'Confirm',
	cancelLabel = 'Cancel',
	onConfirm,
	confirmDisabled = false
}: Props) {
	const [mounted, setMounted] = React.useState(false);

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<TamaguiDialog modal open={open} onOpenChange={onOpenChange}>
			<TamaguiDialog.Portal>
				<TamaguiDialog.Overlay
					key="overlay"
					animation="quick"
					opacity={0.5}
				/>
				<TamaguiDialog.Content
					key="content"
					bordered
					gap="$4"
					{...surfaceElevations.md}
				>
					<TamaguiDialog.Title>{title}</TamaguiDialog.Title>
					{description ? <Paragraph>{description}</Paragraph> : null}
					{children}
					<XStack justifyContent="flex-end" gap="$3">
						<TamaguiDialog.Close asChild>
							<Button chromeless>{cancelLabel}</Button>
						</TamaguiDialog.Close>
						<Button disabled={confirmDisabled} onPress={onConfirm}>
							{confirmLabel}
						</Button>
					</XStack>
				</TamaguiDialog.Content>
			</TamaguiDialog.Portal>
		</TamaguiDialog>
	);
}
