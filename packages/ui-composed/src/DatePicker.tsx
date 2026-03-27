import React from 'react';
import { Calendar } from 'react-native-calendars';
import { Card, Input } from '@twyr/ui-kit';
import { Button, Paragraph, XStack, YStack } from 'tamagui';

type Props = {
	value?: string;
	onChange?: (value: string) => void;
	label?: string;
};

export function DatePicker({ value, onChange, label = 'Select date' }: Props) {
	const [open, setOpen] = React.useState(false);
	const selected = value || '';

	return (
		<YStack gap="$3">
			<Paragraph>{label}</Paragraph>
			<XStack gap="$2" alignItems="center">
				<Input
					value={selected}
					readOnly
					flex={1}
					placeholder="YYYY-MM-DD"
				/>
				<Button onPress={() => setOpen((current) => !current)}>
					{open ? 'Hide' : 'Pick'}
				</Button>
			</XStack>
			{open ? (
				<Card>
					<Calendar
						markedDates={
							selected ? { [selected]: { selected: true } } : {}
						}
						onDayPress={(day) => {
							onChange?.(day.dateString);
							setOpen(false);
						}}
					/>
				</Card>
			) : null}
		</YStack>
	);
}
