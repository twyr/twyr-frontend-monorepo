import { SafeAreaView } from 'react-native';
import { TwyrMobileProviders } from '@twyr/app-providers';
import { ShellMobileShowcaseScreen } from '@twyr/app-shells/src/mobile/ShellMobileShowcaseScreen';
import { buildMobileCorePlatformUrl } from './runtime-config';

export default function App() {
	return (
		<TwyrMobileProviders
			languageActor="users"
			languageOptionsEndpoint={buildMobileCorePlatformUrl(
				'/api/v1/masterdata/locales'
			)}
		>
			<SafeAreaView style={{ flex: 1 }}>
				<ShellMobileShowcaseScreen />
			</SafeAreaView>
		</TwyrMobileProviders>
	);
}
