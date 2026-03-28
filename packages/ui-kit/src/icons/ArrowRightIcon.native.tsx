import { IconArrowRight } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function ArrowRightIcon(props: AppIconProps) {
	return <IconArrowRight {...useNativeIconProps(props)} />;
}
