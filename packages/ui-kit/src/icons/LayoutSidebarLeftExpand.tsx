import { IconLayoutSidebarLeftExpand } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function LayoutSidebarLeftExpandIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return (
		<IconLayoutSidebarLeftExpand
			color={color}
			size={size}
			stroke={stroke}
		/>
	);
}
