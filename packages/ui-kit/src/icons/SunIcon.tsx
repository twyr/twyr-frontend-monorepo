import { IconSun } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function SunIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconSun color={color} size={size} stroke={stroke} />;
}
