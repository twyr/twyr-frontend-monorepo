import type { ReactNode } from 'react';
import { H3, Paragraph, XStack, YStack } from 'tamagui';

type Props = {
	title: string;
	description?: string;
	action?: ReactNode;
};

export function SectionHeader({ title, description, action }: Props) {
	return (
		<XStack
			justifyContent="space-between"
			alignItems="flex-end"
			gap="$4"
			flexWrap="wrap"
		>
			<YStack gap="$1">
				<H3 color="$color">{title}</H3>
				{description ? (
					<Paragraph color="$colorMuted">{description}</Paragraph>
				) : null}
			</YStack>
			{action}
		</XStack>
	);
}
