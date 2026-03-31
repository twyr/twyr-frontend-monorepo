import { IconUserCircle } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function ProfileIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconUserCircle color={color} size={size} stroke={stroke} />;
}
