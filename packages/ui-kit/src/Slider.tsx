import React from 'react';
import { Slider as TamaguiSlider, XStack } from 'tamagui';

type Props = {
	value: number[];
	onValueChange: (value: number[]) => void;
	min?: number;
	max?: number;
	step?: number;
};

export function Slider({
	value,
	onValueChange,
	min = 0,
	max = 100,
	step = 1
}: Props) {
	return (
		<XStack width="100%" maxWidth={320}>
			<TamaguiSlider
				value={value}
				onValueChange={onValueChange}
				min={min}
				max={max}
				step={step}
				flex={1}
			>
				<TamaguiSlider.Track>
					<TamaguiSlider.TrackActive backgroundColor="$primary" />
				</TamaguiSlider.Track>
				<TamaguiSlider.Thumb circular index={0} />
			</TamaguiSlider>
		</XStack>
	);
}
