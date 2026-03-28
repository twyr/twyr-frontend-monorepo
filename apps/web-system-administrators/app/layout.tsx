import type { ReactNode } from 'react';
import './tamagui.css';
import { TwyrWebProviders } from '@twyr/app-providers/src/web';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body>
				<TwyrWebProviders>{children}</TwyrWebProviders>
			</body>
		</html>
	);
}
