import { IconCalendar } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function CalendarIcon(props: AppIconProps) {
	return <IconCalendar {...useWebIconProps(props)} />;
}
