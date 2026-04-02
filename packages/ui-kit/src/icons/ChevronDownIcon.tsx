import { IconChevronDown } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function ChevronDownIcon(props: AppIconProps) {
	return <IconChevronDown {...useWebIconProps(props)} />;
}
