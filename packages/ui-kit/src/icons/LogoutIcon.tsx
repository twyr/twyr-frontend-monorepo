import { IconLogout } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function LogoutIcon(props: AppIconProps) {
	return <IconLogout {...useWebIconProps(props)} />;
}
