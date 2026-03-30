import React from 'react';
import { Button, Card, Input } from '@twyr/ui-kit';
import { Paragraph, XStack, YStack } from 'tamagui';

type Props = {
	value?: string;
	onChange?: (value: string) => void;
	label?: string;
};

export function DatePicker({ value, onChange, label = 'Select date' }: Props) {
	const [open, setOpen] = React.useState(false);
	const selected = value || '';
	const presets = ['2026-03-30', '2026-04-06', '2026-04-13'];

	return (
		<YStack gap="$3">
			<Paragraph>{label}</Paragraph>
			<XStack gap="$2" alignItems="center">
				<Input
					value={selected}
					onChangeText={onChange}
					flex={1}
					placeholder="YYYY-MM-DD"
				/>
				<Button
					tone="secondary"
					onPress={() => setOpen((current) => !current)}
				>
					{open ? 'Hide' : 'Pick'}
				</Button>
			</XStack>
			{open ? (
				<Card description="Shared scaffold with preset date chips and manual entry.">
					<XStack gap="$2" flexWrap="wrap">
						{presets.map((preset) => (
							<Button
								key={preset}
								chromeless
								onPress={() => {
									onChange?.(preset);
									setOpen(false);
								}}
							>
								{preset}
							</Button>
						))}
					</XStack>
				</Card>
			) : null}
		</YStack>
	);
}
