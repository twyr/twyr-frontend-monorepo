import { Button, getVariableValue, useTheme } from 'tamagui';

import { DeviceDesktopIcon, MoonIcon, SunIcon } from './icons';
import { Tooltip } from './Tooltip';

export type MobileThemeMode = 'light' | 'dark' | 'system';

type Props = {
	value: MobileThemeMode;
	onChange: (next: MobileThemeMode) => void;
};

export function MobileThemeToggle({ value, onChange }: Props) {
	const theme = useTheme();
	const nextValue: MobileThemeMode =
		value === 'light' ? 'dark' : value === 'dark' ? 'system' : 'light';
	const label =
		value === 'light' ? 'Light' : value === 'dark' ? 'Dark' : 'System';
	const iconColor = getVariableValue(theme.color);
	const ThemeIcon =
		value === 'light'
			? SunIcon
			: value === 'dark'
				? MoonIcon
				: DeviceDesktopIcon;

	return (
		<Tooltip content={`${label} Mode`}>
			<Button
				chromeless
				width={40}
				height={40}
				padding={0}
				borderRadius={999}
				icon={<ThemeIcon color={iconColor} />}
				onPress={() => onChange(nextValue)}
				accessibilityLabel={`Current theme: ${label}. Switch to ${nextValue}.`}
			/>
		</Tooltip>
	);
}
