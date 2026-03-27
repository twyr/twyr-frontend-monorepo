import React from 'react';
import { Paragraph, XStack, YStack } from 'tamagui';

type Props = {
	title?: string;
	description?: string;
	footer?: React.ReactNode;
	children?: React.ReactNode;
};

export function Card({ title, description, footer, children }: Props) {
	return (
		<YStack
			backgroundColor="$background"
			borderColor="$borderColor"
			borderWidth={1}
			borderRadius="$5"
			padding="$4"
			gap="$3"
			shadowColor="$shadowColor"
			shadowOpacity={0.12}
			shadowRadius={16}
		>
			{title ? (
				<Paragraph fontWeight="700" fontSize="$6">
					{title}
				</Paragraph>
			) : null}
			{description ? (
				<Paragraph color="$colorMuted">{description}</Paragraph>
			) : null}
			{children}
			{footer ? (
				<XStack justifyContent="flex-end">{footer}</XStack>
			) : null}
		</YStack>
	);
}
