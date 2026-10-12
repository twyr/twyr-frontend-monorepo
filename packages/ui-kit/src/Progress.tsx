import {
	Progress as TamaguiProgress,
	styled,
	withStaticProperties
} from 'tamagui';

export const Progress = withStaticProperties(
	styled(TamaguiProgress, {
		displayName: 'TwyrProgress',
		backgroundColor: 'backgroundSoft',
		borderColor: 'border-color'
	}),
	{
		Indicator: styled(TamaguiProgress.Indicator, {
			displayName: 'TwyrProgressIndicator',
			transition: 'quick',
			backgroundColor: 'primary'
		})
	}
);
