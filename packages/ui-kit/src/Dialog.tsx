import { surfaceElevations } from '@twyr/design-system';
import { Dialog as TamaguiDialog, styled, withStaticProperties } from 'tamagui';

export const Dialog = withStaticProperties(TamaguiDialog, {
	Content: styled(TamaguiDialog.Content, {
		displayName: 'TwyrDialogContent',
		gap: '4',
		...surfaceElevations.md
	}),
	Overlay: styled(TamaguiDialog.Overlay, {
		displayName: 'TwyrDialogOverlay',
		transition: 'quick',
		opacity: 0.5
	})
});
