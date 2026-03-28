import { IconDeviceDesktop } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function DeviceDesktopIcon(props: AppIconProps) {
	return <IconDeviceDesktop {...useNativeIconProps(props)} />;
}
