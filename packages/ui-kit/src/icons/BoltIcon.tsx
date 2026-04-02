import { IconBolt } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function BoltIcon(props: AppIconProps) {
	return <IconBolt {...useWebIconProps(props)} />;
}
