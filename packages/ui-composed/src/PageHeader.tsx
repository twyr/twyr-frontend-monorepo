import type { ReactNode } from 'react';
import { H1, Paragraph, XStack, YStack } from 'tamagui';

type Props = {
	eyebrow?: string;
	title: string;
	description?: string;
	actions?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, actions }: Props) {
	return (
		<XStack
			justifyContent="space-between"
			alignItems="flex-start"
			gap="$5"
			flexWrap="wrap"
		>
			<YStack gap="$2" maxWidth={820}>
				{eyebrow ? (
					<Paragraph
						color="$primary"
						fontWeight="700"
						textTransform="uppercase"
						letterSpacing={0.3}
					>
						{eyebrow}
					</Paragraph>
				) : null}
				<H1 color="$color">{title}</H1>
				{description ? (
					<Paragraph color="$colorMuted" size="$5">
						{description}
					</Paragraph>
				) : null}
			</YStack>
			{actions ? <XStack gap="$3">{actions}</XStack> : null}
		</XStack>
	);
}
