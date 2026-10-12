import {
	Tooltip as TamaguiTooltip,
	styled,
	withStaticProperties
} from 'tamagui';

export const Tooltip = withStaticProperties(TamaguiTooltip, {
	Content: styled(TamaguiTooltip.Content, {
		displayName: 'TwyrTooltipContent',
		borderWidth: 1,
		borderColor: 'border-color'
	})
});
