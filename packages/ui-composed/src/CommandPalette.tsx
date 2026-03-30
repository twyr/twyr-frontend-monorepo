import React from 'react';
import { Button, Card, Input } from '@twyr/ui-kit';
import { YStack } from 'tamagui';

type CommandItem = {
	id: string;
	label: string;
	keywords?: string[];
	onSelect?: () => void;
};

type Props = {
	title?: string;
	items: CommandItem[];
};

export function CommandPalette({ title = 'Quick actions', items }: Props) {
	const [query, setQuery] = React.useState('');
	const filtered = items.filter((item) => {
		const haystack = [item.label, ...(item.keywords ?? [])]
			.join(' ')
			.toLowerCase();
		return haystack.includes(query.toLowerCase());
	});

	return (
		<Card
			title={title}
			description="Cross-platform command palette scaffold for quick action discovery."
		>
			<Input
				value={query}
				onChangeText={setQuery}
				placeholder="Search actions..."
			/>
			<YStack gap="$2">
				{filtered.map((item) => (
					<Button
						key={item.id}
						chromeless
						justifyContent="flex-start"
						onPress={item.onSelect}
					>
						{item.label}
					</Button>
				))}
			</YStack>
		</Card>
	);
}
