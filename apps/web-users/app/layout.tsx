import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './tamagui.css';
import '@twyr/app-shells/src/web/public-page.css';
import { TwyrWebProviders } from '@twyr/app-providers/src/web';

export const metadata: Metadata = {
	title: 'Twyr Web Users'
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en-IN" suppressHydrationWarning>
			<body suppressHydrationWarning style={{ margin: 0 }}>
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
