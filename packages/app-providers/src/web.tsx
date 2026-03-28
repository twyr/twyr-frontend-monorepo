'use client';

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { tamaguiConfig } from '@twyr/design-system';
import { type ThemeMode } from '@twyr/ui-kit';

const THEME_STORAGE_KEY = 'twyr:web-theme-mode';

type ResolvedTheme = 'light' | 'dark';

type WebThemeContextValue = {
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
	resolvedTheme: ResolvedTheme;
};

const WebThemeContext = createContext<WebThemeContextValue | null>(null);

function readStoredThemeMode(): ThemeMode {
	if (typeof window === 'undefined') {
		return 'system';
	}

	const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);

	if (
		storedThemeMode === 'light' ||
		storedThemeMode === 'dark' ||
		storedThemeMode === 'system'
	) {
		return storedThemeMode;
	}

	return 'system';
}

export function useWebThemeMode() {
	const value = useContext(WebThemeContext);

	if (!value) {
		throw new Error('useWebThemeMode must be used within TwyrWebProviders');
	}

	return value;
}

export function TwyrWebProviders({ children }: PropsWithChildren) {
	const [themeMode, setThemeMode] = useState<ThemeMode>('system');
	const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');
	const resolvedTheme = useMemo<ResolvedTheme>(() => {
		if (themeMode === 'light') return 'light';
		if (themeMode === 'dark') return 'dark';

		return systemTheme;
	}, [systemTheme, themeMode]);

	useEffect(() => {
		setThemeMode(readStoredThemeMode());

		if (typeof window === 'undefined') {
			return;
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemThemeChange = () => {
			setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
		};

		handleSystemThemeChange();

		mediaQuery.addEventListener('change', handleSystemThemeChange);

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
		document.documentElement.style.colorScheme = resolvedTheme;
	}, [resolvedTheme, themeMode]);

	return (
		<WebThemeContext.Provider
			value={{ themeMode, setThemeMode, resolvedTheme }}
		>
			<TamaguiProvider
				config={tamaguiConfig}
				defaultTheme={resolvedTheme}
			>
				<Theme name={resolvedTheme}>{children}</Theme>
			</TamaguiProvider>
		</WebThemeContext.Provider>
	);
}
