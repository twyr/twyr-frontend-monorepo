import { IconLanguage } from '@tabler/icons-react';

import type { AppIconProps } from './types';
import { useWebIconProps } from './web';

export function LanguageIcon(props: AppIconProps) {
	return <IconLanguage {...useWebIconProps(props)} />;
}
