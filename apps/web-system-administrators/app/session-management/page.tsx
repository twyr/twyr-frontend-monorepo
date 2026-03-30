'use client';

import { SystemAdministratorWebShell } from '@twyr/app-shells/src/web/SystemAdministratorWebShell';
import { Button, Card, Input } from '@twyr/ui-kit';
import { EmptyState, PageHeader, StatCard } from '@twyr/ui-composed';
import { Paragraph, XStack, YStack } from 'tamagui';

export default function SystemAdministratorsSessionManagementPage() {
	return (
		<SystemAdministratorWebShell>
			<YStack gap="$6">
				<PageHeader
					eyebrow="System administrators"
					title="Session Management"
					description="Administrative sign-in and privileged session controls."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<StatCard
						label="Active sessions"
						value="8"
						hint="Concurrent privileged sessions currently represented by this starter surface."
						tone="accent"
					/>
					<StatCard
						label="Recovery methods"
						value="3"
						hint="Supported fallback and recovery paths planned for privileged accounts."
						tone="primary"
					/>
				</XStack>
				<Card
					title="Administrator sign in"
					description="Starter surface for the system_administrators/session_management bounded context."
				>
					<YStack gap="$4">
						<Input placeholder="Work email address" />
						<Input placeholder="Password" secureTextEntry />
						<Button alignSelf="flex-start">Continue</Button>
						<Paragraph color="$colorMuted">
							In production, this screen should delegate to the
							system_administrators session_management frontend
							and BFF.
						</Paragraph>
					</YStack>
				</Card>
				<EmptyState
					title="Audit and device controls"
					description="Device trust, revocation, and audit trails are still intentionally thin in this overlay and should be filled from the bounded context packages."
					action={<Button>Plan follow-up integration</Button>}
				/>
			</YStack>
		</SystemAdministratorWebShell>
	);
}
