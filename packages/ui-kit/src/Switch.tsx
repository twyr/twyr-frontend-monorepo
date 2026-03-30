import React from 'react';
import { Label, Switch as TamaguiSwitch, XStack } from 'tamagui';
import { controlHeights } from './ControlStyles';

type Props = {
	label?: string;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	id?: string;
};

export function Switch({ label, checked = false, onCheckedChange, id }: Props) {
	return (
		<XStack alignItems="center" gap="$3" minHeight={controlHeights.default}>
			<TamaguiSwitch
				id={id}
				checked={checked}
				size="$4"
				onCheckedChange={onCheckedChange}
			>
				<TamaguiSwitch.Thumb animation="quick" />
			</TamaguiSwitch>
			{label ? <Label htmlFor={id}>{label}</Label> : null}
		</XStack>
	);
}
