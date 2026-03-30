import { SafeAreaView } from 'react-native';
import { TwyrMobileProviders } from '@twyr/app-providers';
import { ShellMobileShowcaseScreen } from '@twyr/app-shells/src/mobile/ShellMobileShowcaseScreen';

export default function App() {
	return (
		<TwyrMobileProviders>
			<SafeAreaView style={{ flex: 1 }}>
				<ShellMobileShowcaseScreen />
			</SafeAreaView>
		</TwyrMobileProviders>
	);
}
