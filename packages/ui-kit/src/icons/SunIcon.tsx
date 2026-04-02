import { IconSun } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function SunIcon(props: AppIconProps) {
	return <IconSun {...useWebIconProps(props)} />;
}
