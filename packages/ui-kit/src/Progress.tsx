import React from 'react';
import { Progress as TamaguiProgress } from 'tamagui';

type Props = { value: number; max?: number };

export function Progress({ value, max = 100 }: Props) {
	return (
		<TamaguiProgress
			value={value}
			max={max}
			backgroundColor="$backgroundSoft"
			borderColor="$borderColor"
		>
			<TamaguiProgress.Indicator
				animation="quick"
				backgroundColor="$primary"
			/>
		</TamaguiProgress>
	);
}
