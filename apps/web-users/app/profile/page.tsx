'use client';

import { UserWebShell } from '@twyr/app-shells/src/web/UserWebShell';
import { Button, Card, Input } from '@twyr/ui-kit';
import { PageHeader, SectionHeader, StatCard } from '@twyr/ui-composed';
import { XStack, YStack } from 'tamagui';

export default function UsersProfilePage() {
	return (
		<UserWebShell>
			<YStack gap="$6">
				<PageHeader
					eyebrow="Users"
					title="Profile"
					description="Starter profile editing flows for the users bounded context."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<StatCard
						label="Profile completeness"
						value="84%"
						hint="Placeholder progress until real profile contracts are wired."
						tone="primary"
					/>
					<StatCard
						label="Trusted devices"
						value="3"
						hint="A starter indicator for account continuity across devices."
					/>
				</XStack>
				<Card
					title="Profile details"
					description="Starter surface for the users/profile bounded context."
				>
					<YStack gap="$4">
						<SectionHeader
							title="Public account details"
							description="Keep the user-facing identity surface small and clear until the real DTOs arrive."
						/>
						<Input placeholder="Full name" />
						<Input placeholder="Email address" />
						<Input placeholder="Preferred display name" />
						<Button alignSelf="flex-start">Save changes</Button>
					</YStack>
				</Card>
			</YStack>
		</UserWebShell>
	);
}
