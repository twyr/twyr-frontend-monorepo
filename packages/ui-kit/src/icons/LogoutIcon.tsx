import { IconLogout } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function LogoutIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconLogout color={color} size={size} stroke={stroke} />;
}
