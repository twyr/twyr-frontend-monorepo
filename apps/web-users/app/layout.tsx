import type { ReactNode } from 'react';
import './tamagui.css';
import { TwyrWebProviders } from '@twyr/app-providers/src/web';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en-IN" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<TwyrWebProviders
					languageActor="users"
					languageOptionsEndpoint="/api/v1/masterdata/locales"
				>
					{children}
				</TwyrWebProviders>
			</body>
		</html>
	);
}
