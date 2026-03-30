import { Paragraph, XStack, YStack } from 'tamagui';
import { Card } from '@twyr/ui-kit';

type Props = {
	label: string;
	value: string;
	hint?: string;
	tone?: 'primary' | 'accent' | 'neutral';
};

const toneMap = {
	primary: '$primarySoft',
	accent: '$accentSoft',
	neutral: '$backgroundMuted'
} as const;

export function StatCard({ label, value, hint, tone = 'neutral' }: Props) {
	return (
		<Card title={label}>
			<YStack gap="$3">
				<XStack alignItems="baseline" gap="$2">
					<Paragraph color="$color" fontSize={36} fontWeight="800">
						{value}
					</Paragraph>
					<YStack
						paddingHorizontal="$2"
						paddingVertical="$1"
						backgroundColor={toneMap[tone]}
						borderRadius="$pill"
					>
						<Paragraph color="$colorMuted" fontWeight="700">
							{tone}
						</Paragraph>
					</YStack>
				</XStack>
				{hint ? (
					<Paragraph color="$colorMuted">{hint}</Paragraph>
				) : null}
			</YStack>
		</Card>
	);
}
