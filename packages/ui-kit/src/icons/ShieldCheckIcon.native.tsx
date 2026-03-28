import { IconShieldCheck } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function ShieldCheckIcon(props: AppIconProps) {
	return <IconShieldCheck {...useNativeIconProps(props)} />;
}
