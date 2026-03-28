import { IconChevronDown } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function ChevronDownIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconChevronDown color={color} size={size} stroke={stroke} />;
}
