import { IconCalendar } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function CalendarIcon(props: AppIconProps) {
	return <IconCalendar {...useNativeIconProps(props)} />;
}
