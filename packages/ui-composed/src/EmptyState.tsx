import type { ReactNode } from 'react';
import { YStack } from 'tamagui';
import { Card } from '@twyr/ui-kit';

type Props = {
	title: string;
	description: string;
	action?: ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
	return (
		<Card title={title} description={description}>
			<YStack alignItems="flex-start" gap="$4">
				{action}
			</YStack>
		</Card>
	);
}
