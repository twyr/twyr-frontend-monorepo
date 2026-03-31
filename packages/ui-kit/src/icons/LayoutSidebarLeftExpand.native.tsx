import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function LayoutSidebarLeftExpandIcon(props: AppIconProps) {
	return <IconLayoutSidebarLeftExpand {...useNativeIconProps(props)} />;
}
