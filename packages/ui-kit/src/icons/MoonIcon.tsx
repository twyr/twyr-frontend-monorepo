import { IconMoon } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function MoonIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconMoon color={color} size={size} stroke={stroke} />;
}
