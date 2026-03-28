import type { PropsWithChildren } from 'react';
import { YStack } from 'tamagui';
import { useMobileThemeMode } from '@twyr/app-providers/src/mobile';
import { MobileThemeToggle } from '@twyr/ui-kit';

export function SystemAdministratorMobileShell({
	children
}: PropsWithChildren) {
	const { themeMode, setThemeMode, resolvedTheme } = useMobileThemeMode();

	return (
		<YStack flex={1} theme={resolvedTheme} backgroundColor="$background">
			<YStack padding="$4" alignItems="flex-end">
				<MobileThemeToggle value={themeMode} onChange={setThemeMode} />
			</YStack>
			<YStack flex={1}>{children}</YStack>
		</YStack>
	);
}
