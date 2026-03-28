import { IconMoon } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function MoonIcon(props: AppIconProps) {
	return <IconMoon {...useNativeIconProps(props)} />;
}
