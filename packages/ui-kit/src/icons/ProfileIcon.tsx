import { IconUserCircle } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function ProfileIcon(props: AppIconProps) {
	return <IconUserCircle {...useWebIconProps(props)} />;
}
