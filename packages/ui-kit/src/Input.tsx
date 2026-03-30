import React from 'react';
import { Input as TamaguiInput, GetProps } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

type Props = GetProps<typeof TamaguiInput>;

export function Input(props: Props) {
	return (
		<TamaguiInput
			backgroundColor="$backgroundSoft"
			borderColor="$borderColor"
			focusStyle={{ borderColor: '$primary' }}
			borderRadius="$4"
			minHeight={controlHeights.default}
			paddingHorizontal={controlPadding.horizontal}
			paddingVertical={controlPadding.vertical}
			fontSize="$3"
			lineHeight="$3"
			{...props}
		/>
	);
}
