'use client';

import type { PropsWithChildren } from 'react';
import { TwyrWebProviders } from '@twyr/app-providers/src/web';

export function Providers({ children }: PropsWithChildren) {
	return <TwyrWebProviders>{children}</TwyrWebProviders>;
}
