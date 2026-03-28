import { IconArrowRight } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function ArrowRightIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconArrowRight color={color} size={size} stroke={stroke} />;
}
