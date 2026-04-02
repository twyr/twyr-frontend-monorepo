import { IconMoon } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function MoonIcon(props: AppIconProps) {
	return <IconMoon {...useWebIconProps(props)} />;
}
