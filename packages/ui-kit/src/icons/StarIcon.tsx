import { IconStar } from '@tabler/icons-react';
import type { AppIconProps } from './types';

export function StarIcon({
	color = 'currentColor',
	size = 18,
	stroke = 1.8
}: AppIconProps) {
	return <IconStar color={color} size={size} stroke={stroke} />;
}
