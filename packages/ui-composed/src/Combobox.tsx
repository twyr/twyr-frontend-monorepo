import React from 'react';
import { Button, Card, Input } from '@twyr/ui-kit';
import { Paragraph, YStack } from 'tamagui';

type Option = { label: string; value: string };

type Props = {
	value?: string;
	onValueChange?: (value: string) => void;
	options: Option[];
	placeholder?: string;
	label?: string;
};

export function Combobox({
	value,
	onValueChange,
	options,
	placeholder = 'Search…',
	label
}: Props) {
	const [query, setQuery] = React.useState('');
	const [open, setOpen] = React.useState(false);
	const selectedOption = options.find((option) => option.value === value);
	const filtered = options.filter((option) =>
		option.label.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<YStack gap="$2">
			{label ? <Paragraph>{label}</Paragraph> : null}
			<Input
				value={open ? query : (selectedOption?.label ?? '')}
				onFocus={() => setOpen(true)}
				onChangeText={setQuery}
				placeholder={placeholder}
			/>
			{open ? (
				<Card>
					<YStack gap="$2">
						{filtered.map((option) => (
							<Button
								key={option.value}
								chromeless
								justifyContent="flex-start"
								onPress={() => {
									onValueChange?.(option.value);
									setQuery(option.label);
									setOpen(false);
								}}
							>
								{option.label}
							</Button>
						))}
					</YStack>
				</Card>
			) : null}
		</YStack>
	);
}
