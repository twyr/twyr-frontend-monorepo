import { IconStarFilled } from '@tabler/icons-react';
import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function StarFilledIcon(props: AppIconProps) {
	return <IconStarFilled {...useWebIconProps(props)} />;
}
