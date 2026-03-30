import {
	fontLetterSpacingScale,
	fontLineHeightScale,
	fontSizeScale,
	fontWeightScale,
	namedTypographyScale
} from './foundations';
import { fontFamilies } from './fonts';

export const typography = {
	...namedTypographyScale,
	family: fontFamilies,
	tokens: {
		size: fontSizeScale,
		lineHeight: fontLineHeightScale,
		weight: fontWeightScale,
		letterSpacing: fontLetterSpacingScale
	}
} as const;
