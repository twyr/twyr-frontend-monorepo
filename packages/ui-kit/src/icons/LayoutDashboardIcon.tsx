import { IconLayoutDashboard } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function LayoutDashboardIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconLayoutDashboard color={color} size={size} stroke={stroke} />;
}
