import React from 'react';
import { Accordion as TamaguiAccordion, Text } from 'tamagui';

type Item = { id: string; title: string; content: React.ReactNode };

type Props = { items: Item[] };

export function Accordion({ items }: Props) {
	return (
		<TamaguiAccordion overflow="hidden" type="multiple" width="100%">
			{items.map((item) => (
				<TamaguiAccordion.Item key={item.id} value={item.id}>
					<TamaguiAccordion.Trigger>
						<Text>{item.title}</Text>
					</TamaguiAccordion.Trigger>
					<TamaguiAccordion.Content>
						{item.content}
					</TamaguiAccordion.Content>
				</TamaguiAccordion.Item>
			))}
		</TamaguiAccordion>
	);
}
