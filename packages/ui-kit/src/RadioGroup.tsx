import React from 'react';
import {
	Circle,
	Label,
	RadioGroup as TamaguiRadioGroup,
	XStack,
	YStack
} from 'tamagui';

type Option = { label: string; value: string };

type Props = {
	label?: string;
	value: string;
	onValueChange: (value: string) => void;
	options: Option[];
	name?: string;
};

export function RadioGroup({
	label,
	value,
	onValueChange,
	options,
	name
}: Props) {
	return (
		<YStack gap="$3">
			{label ? <Label>{label}</Label> : null}
			<TamaguiRadioGroup
				value={value}
				onValueChange={onValueChange}
				name={name}
				gap="$2"
			>
				{options.map((option) => (
					<XStack key={option.value} alignItems="center" gap="$3">
						<TamaguiRadioGroup.Item
							value={option.value}
							id={`${name}-${option.value}`}
						>
							<TamaguiRadioGroup.Indicator>
								<Circle backgroundColor="$color" size={8} />
							</TamaguiRadioGroup.Indicator>
						</TamaguiRadioGroup.Item>
						<Label htmlFor={`${name}-${option.value}`}>
							{option.label}
						</Label>
					</XStack>
				))}
			</TamaguiRadioGroup>
		</YStack>
	);
}
