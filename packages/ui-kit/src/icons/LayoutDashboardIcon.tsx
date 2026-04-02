import { IconLayoutDashboard } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function LayoutDashboardIcon(props: AppIconProps) {
	return <IconLayoutDashboard {...useWebIconProps(props)} />;
}
