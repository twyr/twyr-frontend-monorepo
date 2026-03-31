import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function LayoutSidebarLeftCollapseIcon(props: AppIconProps) {
	return <IconLayoutSidebarLeftCollapse {...useNativeIconProps(props)} />;
}
