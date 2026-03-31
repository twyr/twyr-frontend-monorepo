import { IconLayoutSidebarLeftCollapse } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function LayoutSidebarLeftCollapseIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return (
		<IconLayoutSidebarLeftCollapse
			color={color}
			size={size}
			stroke={stroke}
		/>
	);
}
