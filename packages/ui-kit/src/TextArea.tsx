import React from 'react';
import { GetProps, TextArea as TamaguiTextArea } from 'tamagui';

type Props = GetProps<typeof TamaguiTextArea>;

export function TextArea(props: Props) {
	return (
		<TamaguiTextArea
			backgroundColor="$backgroundSoft"
			borderColor="$borderColor"
			focusStyle={{ borderColor: '$primary' }}
			borderRadius="$4"
			{...props}
		/>
	);
}
