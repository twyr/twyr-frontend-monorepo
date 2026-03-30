import { useMobileThemeMode } from '@twyr/app-providers/src/mobile';
import { MobileThemeToggle } from '@twyr/ui-kit';
import { ScrollView, YStack } from 'tamagui';
import { ArtifactShowcaseCatalog } from '../showcase/ArtifactShowcaseCatalog';

export function ShellMobileShowcaseScreen() {
	const { themeMode, setThemeMode } = useMobileThemeMode();

	return (
		<YStack flex={1} backgroundColor="$background">
			<ScrollView flex={1}>
				<ArtifactShowcaseCatalog
					platform="mobile"
					themeControl={
						<MobileThemeToggle
							value={themeMode}
							onChange={setThemeMode}
						/>
					}
				/>
			</ScrollView>
		</YStack>
	);
}
