import { Text, YStack } from 'tamagui';
import { ProfileCard } from '../components/ProfileCard';

export function ProfileScreen() {
	return (
		<YStack padding="$lg" gap="$md">
			<Text fontSize={24} fontWeight="700">
				Users profile
			</Text>
			<ProfileCard displayName="Example User" email="example@twyr.com" />
		</YStack>
	);
}
