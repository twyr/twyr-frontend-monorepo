import React from 'react';
import { Button, Card, TextArea } from '@twyr/ui-kit';
import { Paragraph, XStack, YStack } from 'tamagui';

type Props = {
	value: string;
	onChange: (value: string) => void;
	label?: string;
};

export function RichEditor({ value, onChange, label = 'Rich text' }: Props) {
	const surround = (prefix: string, suffix = prefix) =>
		onChange(`${prefix}${value}${suffix}`);

	return (
		<Card
			title={label}
			description="Lexical-ready scaffold with a shared markdown-style fallback for web and mobile."
		>
			<XStack gap="$2" flexWrap="wrap">
				<Button tone="secondary" onPress={() => surround('**')}>
					Bold
				</Button>
				<Button tone="accent" onPress={() => surround('_')}>
					Italic
				</Button>
				<Button tone="neutral" onPress={() => surround('## ')}>
					Heading
				</Button>
			</XStack>
			<TextArea value={value} onChangeText={onChange} minHeight={180} />
			<YStack>
				<Paragraph color="$colorMuted">
					Use this scaffold to swap in a fuller Lexical web editor
					later.
				</Paragraph>
			</YStack>
		</Card>
	);
}
