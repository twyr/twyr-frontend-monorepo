import { IconTrash } from '@tabler/icons-react-native';
import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function TrashIcon(props: AppIconProps) {
	return <IconTrash {...useNativeIconProps(props)} />;
}
