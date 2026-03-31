import { IconLanguage } from '@tabler/icons-react';

import type { AppIconProps } from './types';

export function LanguageIcon({
	color = 'currentColor',
	size = 24,
	stroke = 2
}: AppIconProps) {
	return <IconLanguage color={color} size={size} stroke={stroke} />;
}
