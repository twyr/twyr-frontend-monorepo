import { IconLanguage } from '@tabler/icons-react-native';

import { useNativeIconProps } from './native';
import type { AppIconProps } from './types';

export function LanguageIcon(props: AppIconProps) {
	return <IconLanguage {...useNativeIconProps(props)} />;
}
