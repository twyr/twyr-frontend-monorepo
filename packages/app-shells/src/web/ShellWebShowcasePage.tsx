'use client';

import { useWebThemeMode } from '@twyr/app-providers/src/web';
import { ShellFrame } from '@twyr/ui-composed';
import { ArtifactShowcaseCatalog } from '../showcase/ArtifactShowcaseCatalog';

const navItems = [
	{ label: 'Overview', href: '#overview' },
	{ label: 'Primitives', href: '#primitives' },
	{ label: 'Composed', href: '#composed' },
	{ label: 'Design System', href: '#design-system' }
];

export function ShellWebShowcasePage() {
	const { themeMode, setThemeMode } = useWebThemeMode();

	return (
		<ShellFrame
			title="Shell Showcase"
			subtitle="Shared UI artifact catalog"
			sidebarTitle="Twyr UI Catalog"
			navItems={navItems}
			themeMode={themeMode}
			onThemeModeChange={setThemeMode}
		>
			<ArtifactShowcaseCatalog platform="web" showToastViewport />
		</ShellFrame>
	);
}
