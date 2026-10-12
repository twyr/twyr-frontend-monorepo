import { tailwindColors } from './tailwind.colors';

const twyrThemes = {
	light: {
		background: tailwindColors.stone[50],
		backgroundSoft: tailwindColors.white,
		backgroundMuted: tailwindColors.stone[100],
		'background-hover': tailwindColors.stone[100],
		'background-press': tailwindColors.stone[200],
		'background-focus': tailwindColors.stone[100],

		color: tailwindColors.slate[900],
		'color-hover': tailwindColors.slate[700],
		'color-press': tailwindColors.slate[800],
		'color-focus': tailwindColors.slate[900],
		colorMuted: tailwindColors.slate[600],
		colorSoft: tailwindColors.slate[500],
		colorInverse: tailwindColors.white,

		'border-color': tailwindColors.stone[200],
		'border-color-hover': tailwindColors.stone[300],
		'border-color-press': tailwindColors.stone[400],
		'border-color-focus': tailwindColors.emerald[500],
		'outline-color': tailwindColors.emerald[500],
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
		'shadow-color': 'rgba(15, 23, 42, 0.12)'
	},
	dark: {
		background: tailwindColors.slate[950],
		backgroundSoft: tailwindColors.slate[900],
		backgroundMuted: tailwindColors.slate[800],
		'background-hover': tailwindColors.slate[800],
		'background-press': tailwindColors.slate[700],
		'background-focus': tailwindColors.slate[800],

		color: tailwindColors.stone[50],
		'color-hover': tailwindColors.stone[200],
		'color-press': tailwindColors.stone[300],
		'color-focus': tailwindColors.stone[50],
		colorMuted: tailwindColors.stone[300],
		colorSoft: tailwindColors.stone[400],
		colorInverse: tailwindColors.slate[950],

		'border-color': tailwindColors.slate[800],
		'border-color-hover': tailwindColors.slate[700],
		'border-color-press': tailwindColors.slate[600],
		'border-color-focus': tailwindColors.emerald[400],
		'outline-color': tailwindColors.emerald[400],
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
		'shadow-color': 'rgba(0, 0, 0, 0.4)'
	}
} as const;

function withNeutralRamp(
	theme: (typeof twyrThemes)['light' | 'dark'],
	dark: boolean
) {
	const neutral = tailwindColors.slate;
	return {
		...theme,
		'color-1': dark ? neutral[950] : tailwindColors.white,
		'color-2': dark ? neutral[900] : neutral[50],
		'color-3': dark ? neutral[800] : neutral[100],
		'color-4': dark ? neutral[700] : neutral[200],
		'color-5': dark ? neutral[600] : neutral[300],
		'color-6': dark ? neutral[500] : neutral[400],
		'color-7': dark ? neutral[400] : neutral[500],
		'color-8': dark ? neutral[300] : neutral[600],
		'color-9': dark ? neutral[200] : neutral[700],
		'color-10': dark ? neutral[100] : neutral[800],
		'color-11': dark ? neutral[50] : neutral[900],
		'color-12': dark ? tailwindColors.white : neutral[950]
	};
}

const light = withNeutralRamp(twyrThemes.light, false);
const dark = withNeutralRamp(twyrThemes.dark, true);

function brandTheme(theme: typeof light | typeof dark) {
	return {
		...theme,
		background: theme.primary,
		'background-hover': theme.primaryHover,
		'background-press': theme.primaryPress,
		'background-focus': theme.primaryHover,
		color: theme.primaryForeground,
		'color-hover': theme.primaryForeground,
		'color-press': theme.primaryForeground,
		'color-focus': theme.primaryForeground,
		'border-color': theme.primary,
		'border-color-hover': theme.primaryHover,
		'border-color-press': theme.primaryPress,
		'border-color-focus': theme.primary,
		'outline-color': theme.primary
	};
}

export const themes = {
	light,
	dark,
	light_brand: brandTheme(light),
	dark_brand: brandTheme(dark)
} as const;
