import { IconGlobe } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function GlobeIcon(props: AppIconProps) {
	return <IconGlobe {...useNativeIconProps(props)} />;
}
