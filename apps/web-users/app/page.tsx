'use client';

import { H1, Paragraph, YStack } from 'tamagui';
import { UserWebShell } from '@twyr/app-shells/src/web/UserWebShell';

export default function UsersHomePage() {
	return (
		<UserWebShell>
			<YStack gap="$4">
				<H1 color="$color">Users</H1>
				<Paragraph color="$colorHover">
					Shared user web shell is now wired and ready.
				</Paragraph>
			</YStack>
		</UserWebShell>
	);
}
