import { IconDeviceDesktop } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function DeviceDesktopIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconDeviceDesktop color={color} size={size} stroke={stroke} />;
}
