import { IconShieldCheck } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function ShieldCheckIcon(props: AppIconProps) {
	return <IconShieldCheck {...useWebIconProps(props)} />;
}
