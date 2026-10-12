import { surfaceElevations } from '@twyr/design-system';
import {
	Popover as TamaguiPopover,
	styled,
	withStaticProperties
} from 'tamagui';

export const Popover = withStaticProperties(TamaguiPopover, {
	Content: styled(TamaguiPopover.Content, {
		displayName: 'TwyrPopoverContent',
		borderWidth: 1,
		borderColor: 'border-color',
		backgroundColor: 'background',
		...surfaceElevations.sm
	})
});
