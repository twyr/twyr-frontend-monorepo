import React from 'react';
import { Platform } from 'react-native';
import { Card, TextArea } from '@twyr/ui-kit';
import { Button, Paragraph, XStack, YStack } from 'tamagui';

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
			description={
				Platform.OS === 'web'
					? 'Lexical-ready scaffold for web, with native-friendly fallback.'
					: 'Native fallback editor scaffold.'
			}
		>
			<XStack gap="$2" flexWrap="wrap">
				<Button onPress={() => surround('**')}>Bold</Button>
				<Button onPress={() => surround('_')}>Italic</Button>
				<Button onPress={() => surround('## ')}>Heading</Button>
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
