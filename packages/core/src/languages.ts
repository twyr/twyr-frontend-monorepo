export const DEFAULT_APP_LANGUAGE = 'en-IN';

export const APP_LANGUAGE_OPTIONS = [
	{ code: 'en-IN', label: 'English' },
	{ code: 'hi-IN', label: 'हिन्दी' },
	{ code: 'kn-IN', label: 'ಕನ್ನಡ' },
	{ code: 'ml-IN', label: 'മലയാളം' },
	{ code: 'mr-IN', label: 'मराठी' },
	{ code: 'ta-IN', label: 'தமிழ்' },
	{ code: 'te-IN', label: 'తెలుగు' },
	{ code: 'gu-IN', label: 'ગુજરાતી' },
	{ code: 'bn-BD', label: 'বাংলা' }
] as const;

export type AppLanguageCode = (typeof APP_LANGUAGE_OPTIONS)[number]['code'];

export function normalizeAppLanguage(value?: string | null): AppLanguageCode {
	if (!value) {
		return DEFAULT_APP_LANGUAGE;
	}

	const trimmedValue = value.trim();
	const exactMatch = APP_LANGUAGE_OPTIONS.find(
		(option) => option.code === trimmedValue
	);

	if (exactMatch) {
		return exactMatch.code;
	}

	const normalizedValue = trimmedValue.toLowerCase();
	const caseInsensitiveMatch = APP_LANGUAGE_OPTIONS.find(
		(option) => option.code.toLowerCase() === normalizedValue
	);

	if (caseInsensitiveMatch) {
		return caseInsensitiveMatch.code;
	}

	const baseLanguage = normalizedValue.split('-')[0];
	const fallbackMatch = APP_LANGUAGE_OPTIONS.find(
		(option) => option.code.toLowerCase().split('-')[0] === baseLanguage
	);

	return fallbackMatch?.code ?? DEFAULT_APP_LANGUAGE;
}
