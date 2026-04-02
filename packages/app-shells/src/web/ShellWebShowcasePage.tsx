'use client';

import { useWebThemeMode } from '@twyr/app-providers/src/web';
import { useTwyrTranslation } from '@twyr/i18n';
import { ShellFrame } from '@twyr/ui-composed';
import { ArtifactShowcaseCatalog } from '../showcase/ArtifactShowcaseCatalog';
import { getShowcaseCopy } from '../showcase/copy';

export function ShellWebShowcasePage() {
	const { themeMode, setThemeMode } = useWebThemeMode();
	const { i18n } = useTwyrTranslation();
	const copy = getShowcaseCopy(i18n.language);
	const navItems = [
		{ label: copy.nav.overview, href: '#overview' },
		{ label: copy.nav.primitives, href: '#primitives' },
		{ label: copy.nav.composed, href: '#composed' },
		{ label: copy.nav.designSystem, href: '#design-system' }
	];

	return (
		<ShellFrame
			title={copy.shell.title}
			subtitle={copy.shell.subtitle}
			sidebarTitle={copy.shell.sidebarTitle}
			navItems={navItems}
			themeMode={themeMode}
			onThemeModeChange={setThemeMode}
		>
			<ArtifactShowcaseCatalog platform="web" showToastViewport />
		</ShellFrame>
	);
}
