import React from 'react';
import { Button as TamaguiButton, GetProps } from 'tamagui';

type Props = GetProps<typeof TamaguiButton>;

export function Button(props: Props) {
	return (
		<TamaguiButton
			backgroundColor="$primary"
			color="$primaryForeground"
			borderRadius="$4"
			pressStyle={{ backgroundColor: '$primaryPress' }}
			hoverStyle={{ backgroundColor: '$primaryHover' }}
			{...props}
		/>
	);
}
