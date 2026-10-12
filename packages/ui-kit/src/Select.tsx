import { Select as TamaguiSelect, styled, withStaticProperties } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

export const Select = withStaticProperties(TamaguiSelect, {
	Trigger: styled(TamaguiSelect.Trigger, {
		displayName: 'TwyrSelectTrigger',
		size: false,
		width: '100%',
		backgroundColor: 'backgroundSoft',
		borderColor: { default: 'border-color', focus: 'primary' },
		borderRadius: '4',
		minHeight: controlHeights.default,
		paddingHorizontal: controlPadding.horizontal,
		paddingVertical: controlPadding.vertical,
		fontSize: '3'
	}),
	Item: styled(TamaguiSelect.Item, {
		displayName: 'TwyrSelectItem',
		minHeight: controlHeights.default,
		paddingHorizontal: controlPadding.horizontal
	}),
	Value: styled(TamaguiSelect.Value, {
		displayName: 'TwyrSelectValue',
		size: false,
		fontSize: '3',
		lineHeight: '3'
	}),
	ItemText: styled(TamaguiSelect.ItemText, {
		displayName: 'TwyrSelectItemText',
		size: false,
		fontSize: '3',
		lineHeight: '3'
	})
});
