import { Text, YStack } from 'tamagui';
import { LoginForm } from '../components/LoginForm';

export function LoginScreen() {
	return (
		<YStack padding="$lg" gap="$md">
			<Text fontSize={24} fontWeight="700">
				System Administrators session management
			</Text>
			<LoginForm />
		</YStack>
	);
}
