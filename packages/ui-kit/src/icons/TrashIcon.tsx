import { IconTrash } from '@tabler/icons-react';
import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function TrashIcon(props: AppIconProps) {
	return <IconTrash {...useWebIconProps(props)} />;
}
