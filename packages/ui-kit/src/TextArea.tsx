import React from 'react';
import { GetProps, TextArea as TamaguiTextArea } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

type Props = GetProps<typeof TamaguiTextArea>;

export function TextArea(props: Props) {
	return (
		<TamaguiTextArea
			backgroundColor="$backgroundSoft"
			borderColor="$borderColor"
			placeholderTextColor="$colorSoft"
			focusStyle={{ borderColor: '$primary' }}
			borderRadius="$4"
			minHeight={controlHeights.comfortable * 2}
			paddingHorizontal={controlPadding.horizontal}
			paddingVertical={controlPadding.textAreaVertical}
			fontSize="$3"
			lineHeight="$3"
			{...props}
		/>
	);
}
