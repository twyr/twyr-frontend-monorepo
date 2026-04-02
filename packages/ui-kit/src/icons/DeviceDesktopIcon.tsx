import { IconDeviceDesktop } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function DeviceDesktopIcon(props: AppIconProps) {
	return <IconDeviceDesktop {...useWebIconProps(props)} />;
}
