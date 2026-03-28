'use client';

import { Text, XStack } from 'tamagui';
import { ThemeToggle, type ThemeMode } from '@twyr/ui-kit/src/ThemeToggle';

type Props = {
	title: string;
	subtitle?: string;
	themeMode: ThemeMode;
	onThemeModeChange: (next: ThemeMode) => void;
};

export function TopNav({
	title,
	subtitle,
	themeMode,
	onThemeModeChange
}: Props) {
	return (
		<XStack
			justifyContent="space-between"
			alignItems="center"
			paddingHorizontal="$5"
			paddingVertical="$4"
			borderBottomWidth={1}
			borderColor="$borderColor"
			backgroundColor="$background"
		>
			<XStack gap="$3" alignItems="center">
				<Text fontSize="$8" fontWeight="700" color="$color">
					{title}
				</Text>
				{subtitle ? <Text color="$colorHover">{subtitle}</Text> : null}
			</XStack>
			<ThemeToggle value={themeMode} onChange={onThemeModeChange} />
		</XStack>
	);
}
