import React from 'react';
import { Checkbox as TamaguiCheckbox, Label, XStack } from 'tamagui';
import { controlHeights } from './ControlStyles';

type Props = {
	label?: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	id?: string;
};

export function Checkbox({
	label,
	checked = false,
	onCheckedChange,
	id
}: Props) {
	return (
		<XStack alignItems="center" gap="$3" minHeight={controlHeights.default}>
			<TamaguiCheckbox
				id={id}
				checked={checked}
				size="$4"
				onCheckedChange={(value) => onCheckedChange?.(Boolean(value))}
			>
				<TamaguiCheckbox.Indicator />
			</TamaguiCheckbox>
			{label ? <Label htmlFor={id}>{label}</Label> : null}
		</XStack>
	);
}
