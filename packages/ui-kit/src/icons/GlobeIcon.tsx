import { IconGlobe } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function GlobeIcon(props: AppIconProps) {
	return <IconGlobe {...useWebIconProps(props)} />;
}
