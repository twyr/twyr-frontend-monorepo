import { IconLogout } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function LogoutIcon(props: AppIconProps) {
	return <IconLogout {...useNativeIconProps(props)} />;
}
