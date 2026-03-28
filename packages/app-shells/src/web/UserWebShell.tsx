'use client';

import type { PropsWithChildren } from 'react';
import { useWebThemeMode } from '@twyr/app-providers/src/web';
import { ShellFrame } from '@twyr/ui-composed/src/ShellFrame';

const navItems = [
	{ label: 'Overview', href: '/' },
	{ label: 'Session Management', href: '/session-management' },
	{ label: 'Profile', href: '/profile' }
];

export function UserWebShell({ children }: PropsWithChildren) {
	const { themeMode, setThemeMode } = useWebThemeMode();

	return (
		<ShellFrame
			title="Users"
			subtitle="User platform"
			sidebarTitle="Twyr Users"
			navItems={navItems}
			themeMode={themeMode}
			onThemeModeChange={setThemeMode}
		>
			{children}
		</ShellFrame>
	);
}
