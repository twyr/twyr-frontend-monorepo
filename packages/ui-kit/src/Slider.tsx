import { Slider as TamaguiSlider, styled, withStaticProperties } from 'tamagui';

export const Slider = withStaticProperties(TamaguiSlider, {
	TrackActive: styled(TamaguiSlider.TrackActive, {
		displayName: 'TwyrSliderTrackActive',
		backgroundColor: 'primary'
	})
});
