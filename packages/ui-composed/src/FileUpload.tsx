import React from 'react';
import { Button, Card } from '@twyr/ui-kit';
import { Paragraph, YStack } from 'tamagui';

type SelectedFile = {
	name: string;
	size?: number;
	type?: string;
};

type Props = {
	title?: string;
	description?: string;
	onSelect?: (files: SelectedFile[]) => void;
};

export function FileUpload({
	title = 'Upload files',
	description = 'Scaffold component for web dropzone and mobile picker.',
	onSelect
}: Props) {
	const [files, setFiles] = React.useState<SelectedFile[]>([]);

	const fakeSelect = () => {
		const selected = [
			{
				name: 'artifact-spec.pdf',
				type: 'application/pdf',
				size: 120000
			},
			{
				name: 'ui-preview.png',
				type: 'image/png',
				size: 86000
			}
		];
		setFiles(selected);
		onSelect?.(selected);
	};

	return (
		<Card title={title} description={description}>
			<Button onPress={fakeSelect}>Add sample files</Button>
			<YStack gap="$2">
				{files.map((file) => (
					<Paragraph key={file.name} color="$colorMuted">
						{file.name}
					</Paragraph>
				))}
			</YStack>
		</Card>
	);
}
