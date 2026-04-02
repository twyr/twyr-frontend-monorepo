import { IconStar } from '@tabler/icons-react';
import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function StarIcon(props: AppIconProps) {
	return <IconStar {...useWebIconProps(props)} />;
}
