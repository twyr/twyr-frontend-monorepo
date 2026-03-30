import React from 'react';
import { Tabs as TamaguiTabs, Text } from 'tamagui';

type TabItem = { key: string; label: string; content: React.ReactNode };

type Props = {
	defaultValue: string;
	items: TabItem[];
};

export function Tabs({ defaultValue, items }: Props) {
	return (
		<TamaguiTabs
			defaultValue={defaultValue}
			orientation="horizontal"
			flexDirection="column"
		>
			<TamaguiTabs.List gap="$2">
				{items.map((item) => (
					<TamaguiTabs.Tab key={item.key} value={item.key}>
						<Text>{item.label}</Text>
					</TamaguiTabs.Tab>
				))}
			</TamaguiTabs.List>

			{items.map((item) => (
				<TamaguiTabs.Content
					key={item.key}
					value={item.key}
					paddingTop="$4"
				>
					{item.content}
				</TamaguiTabs.Content>
			))}
		</TamaguiTabs>
	);
}
