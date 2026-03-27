import React from 'react';
import { Spinner as TamaguiSpinner, YStack } from 'tamagui';

type Props = { size?: 'small' | 'large'; color?: string };

export function Spinner({ size = 'small', color = '$primary' }: Props) {
	return (
		<YStack alignItems="center" justifyContent="center">
			<TamaguiSpinner size={size} color={color} />
		</YStack>
	);
}
