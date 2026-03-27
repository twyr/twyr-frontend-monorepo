import { Card } from '@twyr/ui-kit';
import { Text, YStack } from 'tamagui';

export interface ProfileCardProps {
	displayName: string;
	email?: string;
}

export function ProfileCard({ displayName, email }: ProfileCardProps) {
	return (
		<Card>
			<YStack gap="$xs">
				<Text fontWeight="700">{displayName}</Text>
				{email ? <Text color="$colorMuted">{email}</Text> : null}
			</YStack>
		</Card>
	);
}
