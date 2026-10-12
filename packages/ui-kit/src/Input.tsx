import { Input as TamaguiInput, styled } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

export const Input = styled(TamaguiInput, {
	displayName: 'TwyrInput',
	size: false,
	backgroundColor: 'backgroundSoft',
	borderColor: { default: 'border-color', focus: 'primary' },
	placeholderTextColor: 'colorSoft',
	borderRadius: '4',
	minHeight: controlHeights.default,
	paddingHorizontal: controlPadding.horizontal,
	paddingVertical: controlPadding.vertical,
	fontSize: '3',
	lineHeight: '3'
});
