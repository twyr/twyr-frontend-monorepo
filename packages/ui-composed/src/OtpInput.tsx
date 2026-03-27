import React from 'react';
import { Input } from '@twyr/ui-kit';
import { XStack } from 'tamagui';

type Props = {
	value: string;
	length?: number;
	onChange: (value: string) => void;
};

export function OTPInput({ value, length = 6, onChange }: Props) {
	const digits = Array.from({ length }, (_, index) => value[index] ?? '');

	return (
		<XStack gap="$2">
			{digits.map((digit, index) => (
				<Input
					key={index}
					width={48}
					textAlign="center"
					keyboardType="number-pad"
					value={digit}
					maxLength={1}
					onChangeText={(next) => {
						const chars = value.split('');
						chars[index] = next.slice(-1);
						onChange(chars.join('').slice(0, length));
					}}
				/>
			))}
		</XStack>
	);
}
