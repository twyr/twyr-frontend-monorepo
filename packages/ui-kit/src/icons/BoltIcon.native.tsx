import { IconBolt } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function BoltIcon(props: AppIconProps) {
	return <IconBolt {...useNativeIconProps(props)} />;
}
