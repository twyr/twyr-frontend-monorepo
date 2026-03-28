import { IconShieldCheck } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function ShieldCheckIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconShieldCheck color={color} size={size} stroke={stroke} />;
}
