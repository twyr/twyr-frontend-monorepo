'use client';

import { H1, Paragraph, YStack } from 'tamagui';
import { SystemAdministratorWebShell } from '@twyr/app-shells/src/web/SystemAdministratorWebShell';

export default function SystemAdministratorsHomePage() {
	return (
		<SystemAdministratorWebShell>
			<YStack gap="$4">
				<H1 color="$color">System Administrators</H1>
				<Paragraph color="$colorHover">
					Shared system administrator web shell is now wired and
					ready.
				</Paragraph>
			</YStack>
		</SystemAdministratorWebShell>
	);
}
