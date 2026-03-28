import { IconLayoutDashboard } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function LayoutDashboardIcon(props: AppIconProps) {
	return <IconLayoutDashboard {...useNativeIconProps(props)} />;
}
