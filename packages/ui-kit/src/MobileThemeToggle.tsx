import { Button } from 'tamagui';

import { DeviceDesktopIcon, MoonIcon, SunIcon } from './icons';

export type MobileThemeMode = 'light' | 'dark' | 'system';

type Props = {
	value: MobileThemeMode;
	onChange: (next: MobileThemeMode) => void;
};

export function MobileThemeToggle({ value, onChange }: Props) {
	const nextValue: MobileThemeMode =
		value === 'light' ? 'dark' : value === 'dark' ? 'system' : 'light';
	const label =
		value === 'light' ? 'Light' : value === 'dark' ? 'Dark' : 'System';
	const ThemeIcon =
		value === 'light'
			? SunIcon
			: value === 'dark'
				? MoonIcon
				: DeviceDesktopIcon;

	return (
		<Button
			chromeless
			icon={ThemeIcon}
			onPress={() => onChange(nextValue)}
			accessibilityLabel={`Current theme: ${label}. Switch to ${nextValue}.`}
		>
			{label}
		</Button>
	);
}
