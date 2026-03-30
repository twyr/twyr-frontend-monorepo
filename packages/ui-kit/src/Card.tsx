import React from 'react';
import { surfaceElevations, type SurfaceElevation } from '@twyr/design-system';
import { Paragraph, XStack, YStack } from 'tamagui';

type Props = {
	title?: string;
	description?: string;
	footer?: React.ReactNode;
	children?: React.ReactNode;
	elevation?: SurfaceElevation;
};

function getSurfaceElevation(elevation: SurfaceElevation) {
	switch (elevation) {
		case 'flat': {
			return surfaceElevations.flat;
		}
		case 'xs': {
			return surfaceElevations.xs;
		}
		case 'md': {
			return surfaceElevations.md;
		}
		case 'lg': {
			return surfaceElevations.lg;
		}
		case 'sm':
		default: {
			return surfaceElevations.sm;
		}
	}
}

export function Card({
	title,
	description,
	footer,
	children,
	elevation = 'sm'
}: Props) {
	const elevationStyle = getSurfaceElevation(elevation);

	return (
		<YStack
			backgroundColor="$background"
			borderColor="$borderColor"
			borderWidth={1}
			borderRadius="$5"
			padding="$4"
			gap="$3"
			{...elevationStyle}
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
