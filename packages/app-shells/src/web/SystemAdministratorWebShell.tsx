'use client';

import type { PropsWithChildren } from 'react';
import { useWebThemeMode } from '@twyr/app-providers/src/web';
import { ShellFrame } from '@twyr/ui-composed/src/ShellFrame';

const navItems = [
	{ label: 'Overview', href: '/' },
	{ label: 'Session Management', href: '/session-management' },
	{ label: 'Profile', href: '/profile' }
];

export function SystemAdministratorWebShell({ children }: PropsWithChildren) {
	const { themeMode, setThemeMode } = useWebThemeMode();

	return (
		<ShellFrame
			title="System Administrators"
			subtitle="Administration platform"
			sidebarTitle="Twyr Admin"
			navItems={navItems}
			themeMode={themeMode}
			onThemeModeChange={setThemeMode}
		>
			{children}
		</ShellFrame>
	);
}
