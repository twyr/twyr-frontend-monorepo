import { bnBDTranslation } from './bn-BD';
import { enINTranslation } from './en-IN';
import { guINTranslation } from './gu-IN';
import { hiINTranslation } from './hi-IN';
import { knINTranslation } from './kn-IN';
import { mlINTranslation } from './ml-IN';
import { mrINTranslation } from './mr-IN';
import { taINTranslation } from './ta-IN';
import { teINTranslation } from './te-IN';

export const DEFAULT_TWYR_LOCALE = 'en-IN' as const;

export const TWYR_LOCALES = [
	'bn-BD',
	'en-IN',
	'gu-IN',
	'hi-IN',
	'kn-IN',
	'ml-IN',
	'mr-IN',
	'ta-IN',
	'te-IN'
] as const;

export type TwyrLocale = (typeof TWYR_LOCALES)[number];

export const twyrResources = {
	'bn-BD': {
		translation: bnBDTranslation
	},
	'en-IN': {
		translation: enINTranslation
	},
	'gu-IN': {
		translation: guINTranslation
	},
	'hi-IN': {
		translation: hiINTranslation
	},
	'kn-IN': {
		translation: knINTranslation
	},
	'ml-IN': {
		translation: mlINTranslation
	},
	'mr-IN': {
		translation: mrINTranslation
	},
	'ta-IN': {
		translation: taINTranslation
	},
	'te-IN': {
		translation: teINTranslation
	}
} as const;
