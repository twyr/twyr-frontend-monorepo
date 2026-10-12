import { TextArea as TamaguiTextArea, styled } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

export const TextArea = styled(TamaguiTextArea, {
	displayName: 'TwyrTextArea',
	size: false,
	backgroundColor: 'backgroundSoft',
	borderColor: { default: 'border-color', focus: 'primary' },
	placeholderTextColor: 'colorSoft',
	borderRadius: '4',
	minHeight: controlHeights.comfortable * 2,
	paddingHorizontal: controlPadding.horizontal,
	paddingVertical: controlPadding.textAreaVertical,
	fontSize: '3',
	lineHeight: '3'
});
