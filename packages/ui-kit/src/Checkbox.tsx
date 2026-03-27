import React from 'react';
import { Checkbox as TamaguiCheckbox, Label, XStack } from 'tamagui';

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
		<XStack alignItems="center" gap="$3">
			<TamaguiCheckbox
				id={id}
				checked={checked}
				onCheckedChange={(value) => onCheckedChange?.(Boolean(value))}
			>
				<TamaguiCheckbox.Indicator />
			</TamaguiCheckbox>
			{label ? <Label htmlFor={id}>{label}</Label> : null}
		</XStack>
	);
}
