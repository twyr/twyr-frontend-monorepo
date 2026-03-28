'use client';

import { Separator, Text, XStack, YStack } from 'tamagui';

type NavItem = {
	label: string;
	href: string;
};

type Props = {
	title: string;
	items: NavItem[];
};

export function AppSidebar({ title, items }: Props) {
	return (
		<YStack
			width={260}
			minHeight="100vh"
			backgroundColor="$background"
			borderRightWidth={1}
			borderColor="$borderColor"
			padding="$4"
			gap="$4"
		>
			<Text fontSize="$8" fontWeight="700" color="$color">
				{title}
			</Text>
			<Separator />
			<YStack gap="$2">
				{items.map((item) => (
					<XStack key={item.href}>
						<a
							href={item.href}
							style={{ textDecoration: 'none', width: '100%' }}
						>
							<XStack
								paddingHorizontal="$3"
								paddingVertical="$2"
								borderRadius="$3"
								hoverStyle={{
									backgroundColor: '$backgroundHover'
								}}
							>
								<Text color="$color">{item.label}</Text>
							</XStack>
						</a>
					</XStack>
				))}
			</YStack>
		</YStack>
	);
}
