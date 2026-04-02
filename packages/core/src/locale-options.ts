import {
	APP_LANGUAGE_OPTIONS,
	DEFAULT_APP_LANGUAGE,
	normalizeAppLanguage,
	type AppLanguageCode
} from './languages';
import { runWithInFlightDeduplication } from './inflight-requests';

export type LocaleOption = {
	id?: string;
	code: string;
	language_name: string;
};

export function parseLocaleOptions(payload: unknown): LocaleOption[] {
	const locales = Array.isArray(payload)
		? payload
		: Array.isArray((payload as { data?: unknown[] }).data)
			? (payload as { data: unknown[] }).data
			: Array.isArray((payload as { locales?: unknown[] }).locales)
				? (payload as { locales: unknown[] }).locales
				: [];

	return locales
		.filter(
			(value): value is LocaleOption =>
				typeof value === 'object' &&
				value !== null &&
				typeof (value as { code?: unknown }).code === 'string' &&
				typeof (value as { language_name?: unknown }).language_name ===
					'string'
		)
		.map((value) => ({
			id:
				typeof (value as { id?: unknown }).id === 'string'
					? (value as { id: string }).id
					: undefined,
			code: value.code,
			language_name: value.language_name
		}));
}

export function getFallbackLocaleOptions(): LocaleOption[] {
	return APP_LANGUAGE_OPTIONS.map((option) => ({
		code: option.code,
		language_name: option.label
	}));
}

export async function fetchLocaleOptions(
	endpoint: string,
	locale: AppLanguageCode = DEFAULT_APP_LANGUAGE
): Promise<LocaleOption[]> {
	const url = new URL(endpoint, 'http://localhost');
	url.searchParams.set('lang', normalizeAppLanguage(locale));

	const requestUrl =
		url.origin === 'http://localhost'
			? `${url.pathname}${url.search}`
			: url.toString();

	return runWithInFlightDeduplication(`GET:${requestUrl}`, async () => {
		try {
			const response = await fetch(requestUrl, {
				cache: 'no-store'
			});

			if (!response.ok) {
				return getFallbackLocaleOptions();
			}

			const payload = (await response.json()) as unknown;
			const options = parseLocaleOptions(payload);
			return options.length > 0 ? options : getFallbackLocaleOptions();
		} catch {
			return getFallbackLocaleOptions();
		}
	});
}
