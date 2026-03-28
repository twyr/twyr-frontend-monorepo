import { IconSun } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function SunIcon(props: AppIconProps) {
	return <IconSun {...useNativeIconProps(props)} />;
}
