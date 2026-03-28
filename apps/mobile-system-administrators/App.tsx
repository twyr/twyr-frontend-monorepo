import { Text, YStack } from 'tamagui';
import { TwyrMobileProviders } from '@twyr/app-providers/src/mobile';
import { SystemAdministratorMobileShell } from '@twyr/app-shells/src/mobile/SystemAdministratorMobileShell';

export default function App() {
	return (
		<TwyrMobileProviders>
			<SystemAdministratorMobileShell>
				<YStack flex={1} justifyContent="center" alignItems="center">
					<Text color="$color">System administrators mobile app</Text>
				</YStack>
			</SystemAdministratorMobileShell>
		</TwyrMobileProviders>
	);
}
