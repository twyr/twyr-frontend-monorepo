import { IconStar } from '@tabler/icons-react-native';
import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function StarIcon(props: AppIconProps) {
	return <IconStar {...useNativeIconProps(props)} />;
}
