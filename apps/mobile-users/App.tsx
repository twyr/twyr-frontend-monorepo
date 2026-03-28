import { Text, YStack } from 'tamagui';
import { TwyrMobileProviders } from '@twyr/app-providers/src/mobile';
import { UserMobileShell } from '@twyr/app-shells/src/mobile/UserMobileShell';

export default function App() {
	return (
		<TwyrMobileProviders>
			<UserMobileShell>
				<YStack flex={1} justifyContent="center" alignItems="center">
					<Text color="$color">Users mobile app</Text>
				</YStack>
			</UserMobileShell>
		</TwyrMobileProviders>
	);
}
