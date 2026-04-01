import { IconStarFilled } from '@tabler/icons-react';
import type { AppIconProps } from './types';

export function StarFilledIcon({
	color = 'currentColor',
	size = 18,
	stroke = 1.8
}: AppIconProps) {
	return <IconStarFilled color={color} size={size} stroke={stroke} />;
}
