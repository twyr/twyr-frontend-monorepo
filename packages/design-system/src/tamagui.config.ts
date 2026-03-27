import { createTamagui } from 'tamagui';
import { config as baseConfig } from '@tamagui/config/v3';
import { tokens } from './tokens';
import { themes } from './themes';

export const tamaguiConfig = createTamagui({
	...baseConfig,
	tokens,
	themes,
	defaultTheme: 'light',
	media: {
		xs: { maxWidth: 660 },
		sm: { maxWidth: 800 },
		md: { maxWidth: 1020 },
		lg: { maxWidth: 1280 },
		xl: { maxWidth: 1420 },
		short: { maxHeight: 820 },
		hoverNone: { hover: 'none' },
		pointerCoarse: { pointer: 'coarse' }
	}
});

export type AppTamaguiConfig = typeof tamaguiConfig;

declare module 'tamagui' {
	// eslint-disable-next-line @typescript-eslint/no-empty-object-type
	interface TamaguiCustomConfig extends AppTamaguiConfig {}
}
