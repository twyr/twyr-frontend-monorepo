import { createFont } from '@tamagui/core';
import {
	fontLetterSpacingScale,
	fontLineHeightScale,
	fontSizeScale,
	fontWeightScale
} from './foundations';

export const fontFamilies = {
	body: 'System',
	heading: 'System'
} as const;

export const bodyFont = createFont({
	family: fontFamilies.body,
	size: fontSizeScale,
	lineHeight: fontLineHeightScale,
	weight: fontWeightScale,
	letterSpacing: fontLetterSpacingScale,
	face: {
		400: { normal: '400' },
		500: { normal: '500' },
		600: { normal: '600' },
		700: { normal: '700' }
	}
});

export const headingFont = createFont({
	family: fontFamilies.heading,
	size: fontSizeScale,
	lineHeight: fontLineHeightScale,
	weight: {
		1: '500',
		2: '500',
		3: '600',
		4: '600',
		true: '600',
		5: '600',
		6: '700',
		7: '700',
		8: '700',
		9: '700'
	},
	letterSpacing: {
		1: 0,
		2: 0,
		3: 0,
		4: -0.1,
		true: 0,
		5: -0.1,
		6: -0.2,
		7: -0.3,
		8: -0.4,
		9: -0.5
	},
	face: {
		500: { normal: '500' },
		600: { normal: '600' },
		700: { normal: '700' }
	}
});

export const fonts = {
	body: bodyFont,
	heading: headingFont
} as const;
