'use client';

import { UserWebShell } from '@twyr/app-shells/src/web/UserWebShell';
import { Button, Card, Input } from '@twyr/ui-kit';
import { EmptyState, PageHeader, StatCard } from '@twyr/ui-composed';
import { Paragraph, XStack, YStack } from 'tamagui';

export default function UsersSessionManagementPage() {
	return (
		<UserWebShell>
			<YStack gap="$6">
				<PageHeader
					eyebrow="Users"
					title="Session Management"
					description="Starter login and account continuity flows for the users application."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<StatCard
						label="Remembered sessions"
						value="5"
						hint="Placeholder continuity metric pending real session-management APIs."
						tone="primary"
					/>
					<StatCard
						label="Recovery options"
						value="2"
						hint="Planned starter recovery channels represented by the UI shell."
					/>
				</XStack>
				<Card
					title="Sign in"
					description="Starter surface for the users/session_management bounded context."
				>
					<YStack gap="$4">
						<Input placeholder="Email address" />
						<Input placeholder="Password" secureTextEntry />
						<Button alignSelf="flex-start">Continue</Button>
						<Paragraph color="$colorMuted">
							In production, this screen should delegate to the
							users session_management frontend and BFF.
						</Paragraph>
					</YStack>
				</Card>
				<EmptyState
					title="Passwordless and recovery flows"
					description="This overlay did not include the deeper recovery steps, so the route stays intentionally thin until the real bounded-context contracts are wired."
					action={<Button>Queue next iteration</Button>}
				/>
			</YStack>
		</UserWebShell>
	);
}
