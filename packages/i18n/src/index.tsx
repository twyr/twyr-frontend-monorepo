import { type PropsWithChildren, useEffect } from 'react';
import i18n from 'i18next';
import {
	I18nextProvider,
	initReactI18next,
	useTranslation
} from 'react-i18next';
import {
	DEFAULT_TWYR_LOCALE,
	TWYR_LOCALES,
	type TwyrLocale,
	twyrResources
} from './resources/index';

function resolveDeviceLocale(): TwyrLocale {
	const localeTag =
		typeof navigator !== 'undefined' ? navigator.language : undefined;
	return normalizeTwyrLocale(localeTag);
}

if (!i18n.isInitialized) {
	void i18n.use(initReactI18next).init({
		resources: twyrResources,
		lng: resolveDeviceLocale(),
		fallbackLng: DEFAULT_TWYR_LOCALE,
		supportedLngs: [...TWYR_LOCALES],
		defaultNS: 'translation',
		interpolation: {
			escapeValue: false
		}
	});
}

export function normalizeTwyrLocale(locale?: string | null): TwyrLocale {
	if (!locale) {
		return DEFAULT_TWYR_LOCALE;
	}

	const trimmedLocale = locale.trim();
	const exactMatch = TWYR_LOCALES.find((value) => value === trimmedLocale);

	if (exactMatch) {
		return exactMatch;
	}

	const normalizedLocale = trimmedLocale.toLowerCase();
	const caseInsensitiveMatch = TWYR_LOCALES.find(
		(value) => value.toLowerCase() === normalizedLocale
	);

	if (caseInsensitiveMatch) {
		return caseInsensitiveMatch;
	}

	const baseLanguage = normalizedLocale.split('-')[0];
	const fallbackMatch = TWYR_LOCALES.find(
		(value) => value.toLowerCase().split('-')[0] === baseLanguage
	);

	return fallbackMatch ?? DEFAULT_TWYR_LOCALE;
}

export async function setTwyrLocale(
	locale?: string | null
): Promise<TwyrLocale> {
	const normalizedLocale = normalizeTwyrLocale(locale);
	await i18n.changeLanguage(normalizedLocale);
	return normalizedLocale;
}

export function useTwyrTranslation() {
	return useTranslation();
}

export function TwyrI18nProvider({
	children,
	locale
}: PropsWithChildren<{ locale?: string | null }>) {
	useEffect(() => {
		void setTwyrLocale(locale);
	}, [locale]);

	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { i18n as twyrI18n };
