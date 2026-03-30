'use client';

import {
	createContext,
	type PropsWithChildren,
	useContext,
	useMemo,
	useState
} from 'react';
import { useColorScheme } from 'react-native';
import { ToastProvider } from '@tamagui/toast';
import { TamaguiProvider, Theme, YStack } from 'tamagui';
import { tamaguiConfig } from '@twyr/design-system';
import { type MobileThemeMode } from '@twyr/ui-kit';

type MobileThemeContextValue = {
	themeMode: MobileThemeMode;
	setThemeMode: (mode: MobileThemeMode) => void;
	resolvedTheme: 'light' | 'dark';
};

const MobileThemeContext = createContext<MobileThemeContextValue | null>(null);

export function useMobileThemeMode() {
	const value = useContext(MobileThemeContext);

	if (!value) {
		throw new Error(
			'useMobileThemeMode must be used within TwyrMobileProviders'
		);
	}

	return value;
}

export function TwyrMobileProviders({ children }: PropsWithChildren) {
	const systemScheme = useColorScheme();
	const [themeMode, setThemeMode] = useState<MobileThemeMode>('system');
	const resolvedTheme = useMemo(() => {
		if (themeMode === 'light') return 'light';
		if (themeMode === 'dark') return 'dark';

		return systemScheme === 'dark' ? 'dark' : 'light';
	}, [systemScheme, themeMode]);

	return (
		<MobileThemeContext.Provider
			value={{ themeMode, setThemeMode, resolvedTheme }}
		>
			<TamaguiProvider
				key={resolvedTheme}
				config={tamaguiConfig}
				defaultTheme={resolvedTheme}
			>
				<Theme key={resolvedTheme} name={resolvedTheme}>
					<ToastProvider>
						<YStack flex={1}>{children}</YStack>
					</ToastProvider>
				</Theme>
			</TamaguiProvider>
		</MobileThemeContext.Provider>
	);
}
