import { IconStarFilled } from '@tabler/icons-react-native';
import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function StarFilledIcon(props: AppIconProps) {
	return <IconStarFilled {...useNativeIconProps(props)} />;
}
