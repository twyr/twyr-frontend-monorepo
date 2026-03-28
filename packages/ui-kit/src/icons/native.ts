import { getVariableValue, useTheme } from 'tamagui';

import type { AppIconProps } from './types';

function normalizeIconSize(size?: number | string) {
	if (typeof size === 'number') {
		return size;
	}

	if (typeof size === 'string') {
		const parsedSize = Number(size);

		if (Number.isFinite(parsedSize)) {
			return parsedSize;
		}
	}

	return 24;
}

function resolveNativeIconColor(
	color: unknown,
	theme: ReturnType<typeof useTheme>
) {
	if (typeof color === 'string') {
		if (color.startsWith('$')) {
			return getVariableValue(theme[color as keyof typeof theme]);
		}

		return color;
	}

	if (color != null) {
		return getVariableValue(color);
	}

	return getVariableValue(theme.color);
}

export function useNativeIconProps(props: AppIconProps) {
	const theme = useTheme();

	return {
		color: resolveNativeIconColor(props.color, theme),
		size: normalizeIconSize(props.size),
		strokeWidth: props.stroke ?? 2
	};
}
