export const sizeScale = {
	true: 16,
	0: 0,
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	5: 20,
	6: 24,
	7: 28,
	8: 32,
	9: 40,
	10: 48,
	11: 56,
	12: 64
} as const;

export const spaceScale = {
	true: 16,
	0: 0,
	1: 4,
	2: 8,
	3: 12,
	4: 16,
	5: 20,
	6: 24,
	7: 28,
	8: 32,
	9: 40,
	10: 48,
	11: 56,
	12: 64
} as const;

export const radiusScale = {
	true: 10,
	0: 0,
	1: 6,
	2: 10,
	3: 14,
	4: 18,
	5: 24,
	6: 32,
	pill: 999
} as const;

export const zIndexScale = {
	0: 0,
	1: 100,
	2: 200,
	3: 300,
	4: 400,
	5: 500,
	6: 1000
} as const;

export const fontSizeScale = {
	1: 12,
	2: 14,
	3: 16,
	4: 18,
	true: 16,
	5: 20,
	6: 24,
	7: 30,
	8: 36,
	9: 48
} as const;

export const fontLineHeightScale = {
	1: 16,
	2: 20,
	3: 24,
	4: 28,
	true: 24,
	5: 30,
	6: 34,
	7: 40,
	8: 44,
	9: 56
} as const;

export const fontWeightScale = {
	1: '400',
	2: '400',
	3: '400',
	4: '500',
	true: '400',
	5: '500',
	6: '600',
	7: '600',
	8: '700',
	9: '700'
} as const;

export const fontLetterSpacingScale = {
	1: 0,
	2: 0,
	3: 0,
	4: 0,
	true: 0,
	5: 0,
	6: 0,
	7: -0.2,
	8: -0.3,
	9: -0.4
} as const;

export const namedTypographyScale = {
	size: {
		xs: 12,
		sm: 14,
		md: 16,
		lg: 18,
		xl: 20,
		'2xl': 24,
		'3xl': 30,
		'4xl': 36,
		'5xl': 48
	},
	lineHeight: {
		xs: 16,
		sm: 20,
		md: 24,
		lg: 28,
		xl: 30,
		'2xl': 34,
		'3xl': 40,
		'4xl': 44,
		'5xl': 56
	},
	weight: {
		regular: '400',
		medium: '500',
		semibold: '600',
		bold: '700'
	},
	letterSpacing: {
		tight: -0.4,
		normal: 0,
		wide: 0.3
	}
} as const;

export const shadowScale = {
	xs: {
		shadowColor: '$shadowColor',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1
	},
	sm: {
		shadowColor: '$shadowColor',
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.08,
		shadowRadius: 16,
		elevation: 2
	},
	md: {
		shadowColor: '$shadowColor',
		shadowOffset: { width: 0, height: 14 },
		shadowOpacity: 0.12,
		shadowRadius: 32,
		elevation: 4
	},
	lg: {
		shadowColor: '$shadowColor',
		shadowOffset: { width: 0, height: 22 },
		shadowOpacity: 0.18,
		shadowRadius: 48,
		elevation: 6
	}
} as const;

export const surfaceElevations = {
	flat: {},
	xs: shadowScale.xs,
	sm: shadowScale.sm,
	md: shadowScale.md,
	lg: shadowScale.lg
} as const;

export type SurfaceElevation = keyof typeof surfaceElevations;
