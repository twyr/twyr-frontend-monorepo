'use client';

import type { PropsWithChildren } from 'react';
import { XStack, YStack } from 'tamagui';
import { type ThemeMode } from '@twyr/ui-kit';
import { AppSidebar } from './AppSidebar';
import { TopNav } from './TopNav';

type Props = PropsWithChildren<{
	title: string;
	subtitle?: string;
	sidebarTitle: string;
	navItems: Array<{ label: string; href: string }>;
	themeMode: ThemeMode;
	onThemeModeChange: (next: ThemeMode) => void;
}>;

export function ShellFrame({
	title,
	subtitle,
	sidebarTitle,
	navItems,
	themeMode,
	onThemeModeChange,
	children
}: Props) {
	return (
		<XStack minHeight="100vh" backgroundColor="$background">
			<AppSidebar title={sidebarTitle} items={navItems} />
			<YStack flex={1}>
				<TopNav
					title={title}
					subtitle={subtitle}
					themeMode={themeMode}
					onThemeModeChange={onThemeModeChange}
				/>
				<YStack flex={1} padding="$5" gap="$5">
					{children}
				</YStack>
			</YStack>
		</XStack>
	);
}
