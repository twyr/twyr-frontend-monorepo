import { IconGlobe } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function GlobeIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconGlobe color={color} size={size} stroke={stroke} />;
}
