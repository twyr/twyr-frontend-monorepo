import { IconBolt } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function BoltIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconBolt color={color} size={size} stroke={stroke} />;
}
