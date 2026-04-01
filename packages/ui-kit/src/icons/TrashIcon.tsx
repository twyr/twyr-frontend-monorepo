import { IconTrash } from '@tabler/icons-react';
import type { AppIconProps } from './types';

export function TrashIcon({
	color = 'currentColor',
	size = 18,
	stroke = 1.8
}: AppIconProps) {
	return <IconTrash color={color} size={size} stroke={stroke} />;
}
