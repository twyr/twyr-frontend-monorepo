'use client';

import { H1, Paragraph, XStack, YStack } from 'tamagui';
import { Button, Card, Input } from '@twyr/ui-kit';

export default function HomePage() {
	return (
		<main>
			<YStack
				minHeight="100vh"
				backgroundColor="$background"
				padding="$8"
				gap="$6"
			>
				<YStack gap="$3" maxWidth={760}>
					<Paragraph
						color="$accent"
						fontWeight="700"
						textTransform="uppercase"
					>
						Twyr Platform
					</Paragraph>
					<H1 color="$color" size="$10">
						Premium SaaS foundation, wired for Tamagui.
					</H1>
					<Paragraph color="$colorMuted" size="$5">
						This shell is using semantic theme tokens derived from
						the standard Tailwind palette, tuned for a rich,
						high-end product surface.
					</Paragraph>
				</YStack>

				<XStack gap="$5" flexWrap="wrap">
					<YStack width={420} maxWidth="100%">
						<Card>
							<YStack gap="$4">
								<Paragraph
									color="$color"
									fontWeight="700"
									size="$6"
								>
									Request access
								</Paragraph>
								<Paragraph color="$colorMuted">
									A starter card showing how shared components
									inherit Twyr theme semantics.
								</Paragraph>
								<Input placeholder="Work email" />
								<Button>Book demo</Button>
							</YStack>
						</Card>
					</YStack>

					<YStack width={320} maxWidth="100%">
						<Card>
							<YStack gap="$3">
								<Paragraph
									color="$color"
									fontWeight="700"
									size="$6"
								>
									Signals
								</Paragraph>
								<Paragraph color="$colorMuted">
									99.99% uptime target
								</Paragraph>
								<Paragraph color="$colorMuted">
									Multi-surface design system
								</Paragraph>
								<Paragraph color="$colorMuted">
									BFF + bounded-context architecture
								</Paragraph>
							</YStack>
						</Card>
					</YStack>
				</XStack>
			</YStack>
		</main>
	);
}
