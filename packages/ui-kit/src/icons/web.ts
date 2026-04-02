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

function resolveWebIconColor(
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

export function useWebIconProps(props: AppIconProps) {
	const theme = useTheme();

	return {
		color: resolveWebIconColor(props.color, theme),
		size: normalizeIconSize(props.size),
		stroke: props.stroke ?? 2
	};
}
