import type { ReactNode } from 'react';
import './tamagui.css';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en-IN" suppressHydrationWarning>
			<body suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
