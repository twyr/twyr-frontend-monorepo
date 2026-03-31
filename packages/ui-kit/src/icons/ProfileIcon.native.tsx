import { IconUserCircle } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function ProfileIcon(props: AppIconProps) {
	return <IconUserCircle {...useNativeIconProps(props)} />;
}
