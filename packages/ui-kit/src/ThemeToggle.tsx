'use client';

import { Button } from 'tamagui';

import { DeviceDesktopIcon, MoonIcon, SunIcon } from './icons';

export type ThemeMode = 'light' | 'dark' | 'system';

type Props = {
	value: ThemeMode;
	onChange: (next: ThemeMode) => void;
};

export function ThemeToggle({ value, onChange }: Props) {
	const nextTheme: ThemeMode =
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
			onPress={() => onChange(nextTheme)}
			accessibilityLabel={`Current theme: ${label}. Switch to ${nextTheme}.`}
		>
			{label}
		</Button>
	);
}
