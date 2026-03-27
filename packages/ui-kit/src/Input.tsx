import React from 'react';
import { Input as TamaguiInput, GetProps } from 'tamagui';

type Props = GetProps<typeof TamaguiInput>;

export function Input(props: Props) {
	return (
		<TamaguiInput
			backgroundColor="$backgroundSoft"
			borderColor="$borderColor"
			focusStyle={{ borderColor: '$primary' }}
			borderRadius="$4"
			{...props}
		/>
	);
}
