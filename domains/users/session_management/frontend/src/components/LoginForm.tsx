import { Button, Input, Card } from '@twyr/ui-kit';
import { Text, YStack } from 'tamagui';

export function LoginForm() {
	return (
		<Card>
			<YStack gap="$sm">
				<Text fontWeight="700">Login</Text>
				<Input placeholder="Mobile number or email" />
				<Input placeholder="OTP" secureTextEntry />
				<Button>Sign in</Button>
			</YStack>
		</Card>
	);
}
