'use client';

import { SystemAdministratorWebShell } from '@twyr/app-shells/src/web/SystemAdministratorWebShell';
import { Button, Card, Input } from '@twyr/ui-kit';
import { PageHeader, SectionHeader, StatCard } from '@twyr/ui-composed';
import { Paragraph, XStack, YStack } from 'tamagui';

export default function SystemAdministratorsProfilePage() {
	return (
		<SystemAdministratorWebShell>
			<YStack gap="$6">
				<PageHeader
					eyebrow="System administrators"
					title="Profile"
					description="Operational identity and contact settings for privileged users."
				/>
				<XStack gap="$4" flexWrap="wrap">
					<StatCard
						label="Privileges"
						value="12"
						hint="Active administrative capabilities in the current starter shell."
						tone="accent"
					/>
					<StatCard
						label="Linked factors"
						value="2"
						hint="Authentication factors attached to this operator identity."
						tone="primary"
					/>
				</XStack>
				<Card
					title="Administrator profile"
					description="Starter surface for the system_administrators/profile bounded context."
				>
					<YStack gap="$4">
						<SectionHeader
							title="Identity"
							description="Keep operator-facing profile data current across support and audit flows."
						/>
						<Input placeholder="Full name" />
						<Input placeholder="Work email address" />
						<Input placeholder="Team or business unit" />
						<Button alignSelf="flex-start">Save changes</Button>
						<Paragraph color="$colorMuted">
							In production, this screen should delegate to the
							system_administrators profile frontend and BFF.
						</Paragraph>
					</YStack>
				</Card>
			</YStack>
		</SystemAdministratorWebShell>
	);
}
