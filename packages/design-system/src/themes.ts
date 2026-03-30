import { tailwindColors } from './tailwind.colors';

export const themes = {
	light: {
		background: tailwindColors.stone[50],
		backgroundSoft: tailwindColors.white,
		backgroundMuted: tailwindColors.stone[100],
		backgroundHover: tailwindColors.stone[100],
		backgroundPress: tailwindColors.stone[200],
		backgroundFocus: tailwindColors.stone[100],

		color: tailwindColors.slate[900],
		colorHover: tailwindColors.slate[700],
		colorPress: tailwindColors.slate[800],
		colorFocus: tailwindColors.slate[900],
		colorMuted: tailwindColors.slate[600],
		colorSoft: tailwindColors.slate[500],
		colorInverse: tailwindColors.white,

		borderColor: tailwindColors.stone[200],
		borderColorHover: tailwindColors.stone[300],
		borderColorPress: tailwindColors.stone[400],
		borderColorFocus: tailwindColors.emerald[500],
		outlineColor: tailwindColors.emerald[500],
		borderFocus: tailwindColors.emerald[500],

		primary: tailwindColors.emerald[600],
		primarySoft: tailwindColors.emerald[100],
		primaryHover: tailwindColors.emerald[700],
		primaryPress: tailwindColors.emerald[800],
		primaryForeground: tailwindColors.white,

		secondary: tailwindColors.slate[900],
		secondaryHover: tailwindColors.slate[800],
		secondaryPress: tailwindColors.slate[700],
		secondaryForeground: tailwindColors.white,

		accent: tailwindColors.amber[500],
		accentSoft: tailwindColors.amber[100],
		accentForeground: tailwindColors.slate[950],

		success: tailwindColors.emerald[600],
		warning: tailwindColors.amber[500],
		danger: tailwindColors.red[600],

		overlay: 'rgba(15, 23, 42, 0.55)',
		shadowColor: 'rgba(15, 23, 42, 0.12)'
	},
	dark: {
		background: tailwindColors.slate[950],
		backgroundSoft: tailwindColors.slate[900],
		backgroundMuted: tailwindColors.slate[800],
		backgroundHover: tailwindColors.slate[800],
		backgroundPress: tailwindColors.slate[700],
		backgroundFocus: tailwindColors.slate[800],

		color: tailwindColors.stone[50],
		colorHover: tailwindColors.stone[200],
		colorPress: tailwindColors.stone[300],
		colorFocus: tailwindColors.stone[50],
		colorMuted: tailwindColors.stone[300],
		colorSoft: tailwindColors.stone[400],
		colorInverse: tailwindColors.slate[950],

		borderColor: tailwindColors.slate[800],
		borderColorHover: tailwindColors.slate[700],
		borderColorPress: tailwindColors.slate[600],
		borderColorFocus: tailwindColors.emerald[400],
		outlineColor: tailwindColors.emerald[400],
		borderFocus: tailwindColors.emerald[400],

		primary: tailwindColors.emerald[500],
		primarySoft: tailwindColors.emerald[950],
		primaryHover: tailwindColors.emerald[400],
		primaryPress: tailwindColors.emerald[300],
		primaryForeground: tailwindColors.slate[950],

		secondary: tailwindColors.stone[100],
		secondaryHover: tailwindColors.stone[200],
		secondaryPress: tailwindColors.stone[300],
		secondaryForeground: tailwindColors.slate[950],

		accent: tailwindColors.amber[400],
		accentSoft: tailwindColors.amber[950],
		accentForeground: tailwindColors.slate[950],

		success: tailwindColors.emerald[500],
		warning: tailwindColors.amber[400],
		danger: tailwindColors.red[500],

		overlay: 'rgba(2, 6, 23, 0.7)',
		shadowColor: 'rgba(0, 0, 0, 0.4)'
	}
} as const;
