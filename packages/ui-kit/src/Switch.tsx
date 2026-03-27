import React from 'react';
import { Label, Switch as TamaguiSwitch, XStack } from 'tamagui';

type Props = {
	label?: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	id?: string;
};

export function Switch({ label, checked = false, onCheckedChange, id }: Props) {
	return (
		<XStack alignItems="center" gap="$3">
			<TamaguiSwitch
				id={id}
				checked={checked}
				onCheckedChange={onCheckedChange}
			>
				<TamaguiSwitch.Thumb animation="quick" />
			</TamaguiSwitch>
			{label ? <Label htmlFor={id}>{label}</Label> : null}
		</XStack>
	);
}
