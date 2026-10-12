import type { ReactNode } from 'react';
import { YStack, Paragraph } from 'tamagui';
import { Card } from '@twyr/ui-kit';

type Props = {
	title: string;
	description: string;
	action?: ReactNode;
};

export function EmptyState({ title, description, action }: Props) {
	return (
		<Card>
			{title || description ? (
				<Card.Header>
					{title ? (
						<Paragraph fontWeight="700" fontSize="6">
							{title}
						</Paragraph>
					) : null}
					{description ? (
						<Paragraph color="colorMuted">{description}</Paragraph>
					) : null}
				</Card.Header>
			) : null}
			<YStack alignItems="flex-start" gap="4">
				{action}
			</YStack>
		</Card>
	);
}
