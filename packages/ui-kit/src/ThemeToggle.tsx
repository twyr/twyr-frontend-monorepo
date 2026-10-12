'use client';

import { getVariableValue, useTheme, Paragraph } from 'tamagui';
import { Button } from './Button';

import { DeviceDesktopIcon, MoonIcon, SunIcon } from './icons';
import { Tooltip } from './Tooltip';

export type ThemeMode = 'light' | 'dark' | 'system';

type Props = {
	value: ThemeMode;
	onChange: (next: ThemeMode) => void;
};

export function ThemeToggle({ value, onChange }: Props) {
	const theme = useTheme();
	const nextTheme: ThemeMode =
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
		<Tooltip>
			<Tooltip.Trigger asChild>
				<Button
					variant="quiet"
					width={40}
					height={40}
					padding={0}
					borderRadius={999}
					icon={<ThemeIcon color={iconColor} />}
					onPress={() => onChange(nextTheme)}
					aria-label={`Current theme: ${label}. Switch to ${nextTheme}.`}
				/>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<Paragraph>{`${label} Mode`}</Paragraph>
			</Tooltip.Content>
		</Tooltip>
	);
}
