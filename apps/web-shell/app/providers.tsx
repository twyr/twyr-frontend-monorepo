'use client';

import type { PropsWithChildren } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';
import { tamaguiConfig } from '@twyr/design-system';

export function Providers({ children }: PropsWithChildren) {
	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme="light">
			<Theme name="light">{children}</Theme>
		</TamaguiProvider>
	);
}
