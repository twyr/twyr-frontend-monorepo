export const themes = {
	light: {
		background: '$stone50',
		backgroundSoft: '$white',
		backgroundHover: '$stone100',
		backgroundPress: '$stone200',
		backgroundFocus: '$stone100',

		color: '$slate900',
		colorFocus: '$slate900',
		colorMuted: '$slate600',
		colorSoft: '$slate500',
		colorInverse: '$white',

		borderColor: '$stone200',
		borderColorHover: '$stone300',
		borderColorPress: '$stone400',
		borderColorFocus: '$emerald500',
		outlineColor: '$emerald500',
		borderFocus: '$emerald500',

		primary: '$emerald600',
		primaryHover: '$emerald700',
		primaryPress: '$emerald800',
		primaryForeground: '$white',

		secondary: '$slate900',
		secondaryHover: '$slate800',
		secondaryPress: '$slate700',
		secondaryForeground: '$white',

		accent: '$amber500',
		accentForeground: '$slate950',

		success: '$emerald600',
		warning: '$amber500',
		danger: '$red600',

		overlay: 'rgba(15, 23, 42, 0.55)',
		shadowColor: 'rgba(15, 23, 42, 0.12)'
	},
	dark: {
		background: '$slate950',
		backgroundSoft: '$slate900',
		backgroundHover: '$slate800',
		backgroundPress: '$slate700',
		backgroundFocus: '$slate800',

		color: '$stone50',
		colorFocus: '$stone50',
		colorMuted: '$stone300',
		colorSoft: '$stone400',
		colorInverse: '$slate950',

		borderColor: '$slate800',
		borderColorHover: '$slate700',
		borderColorPress: '$slate600',
		borderColorFocus: '$emerald400',
		outlineColor: '$emerald400',
		borderFocus: '$emerald400',

		primary: '$emerald500',
		primaryHover: '$emerald400',
		primaryPress: '$emerald300',
		primaryForeground: '$slate950',

		secondary: '$stone100',
		secondaryHover: '$stone200',
		secondaryPress: '$stone300',
		secondaryForeground: '$slate950',

		accent: '$amber400',
		accentForeground: '$slate950',

		success: '$emerald500',
		warning: '$amber400',
		danger: '$red500',

		overlay: 'rgba(2, 6, 23, 0.7)',
		shadowColor: 'rgba(0, 0, 0, 0.4)'
	}
} as const;
