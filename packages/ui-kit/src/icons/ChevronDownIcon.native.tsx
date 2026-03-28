import { IconChevronDown } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function ChevronDownIcon(props: AppIconProps) {
	return <IconChevronDown {...useNativeIconProps(props)} />;
}
