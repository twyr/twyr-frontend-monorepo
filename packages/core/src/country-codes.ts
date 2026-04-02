import { runWithInFlightDeduplication } from './inflight-requests';

export type CountryCodeOption = {
	id?: string;
	iso_code: string;
	country_name: string;
	phone_code?: string;
	is_enabled?: boolean;
};

const FALLBACK_COUNTRY_CODE_OPTIONS: CountryCodeOption[] = [
	{
		iso_code: 'IND',
		country_name: 'India',
		phone_code: '+91',
		is_enabled: true
	}
];

const countryCodeOptionsCache = new Map<string, CountryCodeOption[]>();

const PREFERRED_COUNTRY_IDENTIFIERS = new Set(['IN', 'IND']);

function readCountryCodeRecord(value: unknown): CountryCodeOption | null {
	if (typeof value !== 'object' || value === null) {
		return null;
	}

	const entry = value as {
		id?: unknown;
		iso_code?: unknown;
		code?: unknown;
		country_code?: unknown;
		country_name?: unknown;
		display_name?: unknown;
		name?: unknown;
		phone_code?: unknown;
		country_calling_code?: unknown;
		dial_code?: unknown;
		dialing_code?: unknown;
		calling_code?: unknown;
		isd_code?: unknown;
		is_enabled?: unknown;
		enabled?: unknown;
		attributes?: {
			id?: unknown;
			iso_code?: unknown;
			code?: unknown;
			country_code?: unknown;
			country_name?: unknown;
			display_name?: unknown;
			name?: unknown;
			phone_code?: unknown;
			country_calling_code?: unknown;
			dial_code?: unknown;
			dialing_code?: unknown;
			calling_code?: unknown;
			isd_code?: unknown;
			is_enabled?: unknown;
			enabled?: unknown;
		};
	};

	const rawIsoCode =
		typeof entry.attributes?.iso_code === 'string'
			? entry.attributes.iso_code
			: typeof entry.iso_code === 'string'
				? entry.iso_code
				: typeof entry.attributes?.code === 'string'
					? entry.attributes.code
					: typeof entry.code === 'string'
						? entry.code
						: typeof entry.attributes?.country_code === 'string'
							? entry.attributes.country_code
							: typeof entry.country_code === 'string'
								? entry.country_code
								: '';
	const iso_code = rawIsoCode.trim().toUpperCase();

	if (!/^[A-Z]{2,3}$/.test(iso_code)) {
		return null;
	}

	const rawCountryName =
		typeof entry.attributes?.country_name === 'string'
			? entry.attributes.country_name
			: typeof entry.country_name === 'string'
				? entry.country_name
				: typeof entry.attributes?.display_name === 'string'
					? entry.attributes.display_name
					: typeof entry.display_name === 'string'
						? entry.display_name
						: typeof entry.attributes?.name === 'string'
							? entry.attributes.name
							: typeof entry.name === 'string'
								? entry.name
								: '';
	const country_name = rawCountryName.trim();

	if (!country_name) {
		return null;
	}

	const rawPhoneCode =
		typeof entry.attributes?.phone_code === 'string'
			? entry.attributes.phone_code
			: typeof entry.phone_code === 'string'
				? entry.phone_code
				: typeof entry.attributes?.country_calling_code === 'string'
					? entry.attributes.country_calling_code
					: typeof entry.country_calling_code === 'string'
						? entry.country_calling_code
						: typeof entry.attributes?.dial_code === 'string'
							? entry.attributes.dial_code
							: typeof entry.dial_code === 'string'
								? entry.dial_code
								: typeof entry.attributes?.dialing_code ===
									  'string'
									? entry.attributes.dialing_code
									: typeof entry.dialing_code === 'string'
										? entry.dialing_code
										: typeof entry.attributes
													?.calling_code === 'string'
											? entry.attributes.calling_code
											: typeof entry.calling_code ===
												  'string'
												? entry.calling_code
												: typeof entry.attributes
															?.isd_code ===
													  'string'
													? entry.attributes.isd_code
													: typeof entry.isd_code ===
														  'string'
														? entry.isd_code
														: undefined;
	const phone_code = rawPhoneCode?.trim() || undefined;

	const rawEnabled =
		typeof entry.attributes?.is_enabled === 'boolean'
			? entry.attributes.is_enabled
			: typeof entry.is_enabled === 'boolean'
				? entry.is_enabled
				: typeof entry.attributes?.enabled === 'boolean'
					? entry.attributes.enabled
					: typeof entry.enabled === 'boolean'
						? entry.enabled
						: undefined;

	const result: CountryCodeOption = {
		id:
			typeof entry.attributes?.id === 'string'
				? entry.attributes.id
				: typeof entry.id === 'string'
					? entry.id
					: undefined,
		iso_code,
		country_name,
		phone_code,
		is_enabled: rawEnabled
	};

	return result;
}

export function parseCountryCodeOptions(payload: unknown): CountryCodeOption[] {
	const countryCodes = Array.isArray(payload)
		? payload
		: Array.isArray((payload as { data?: unknown[] }).data)
			? (payload as { data: unknown[] }).data
			: [];

	return countryCodes
		.map(readCountryCodeRecord)
		.filter((value): value is CountryCodeOption => value !== null)
		.filter((value) => value.is_enabled !== false);
}

export function formatCountryCodeOptionLabel(option: CountryCodeOption) {
	const normalizedPhoneCode = option.phone_code?.trim() ?? '';

	if (normalizedPhoneCode.length > 0) {
		const dialCode = normalizedPhoneCode.startsWith('+')
			? normalizedPhoneCode
			: `+${normalizedPhoneCode}`;
		return `${option.country_name} (${dialCode})`;
	}

	return `${option.country_name} (${option.iso_code})`;
}

export function getFallbackCountryCodeOptions(): CountryCodeOption[] {
	return FALLBACK_COUNTRY_CODE_OPTIONS;
}

export function getDefaultCountryCodeValue(options: CountryCodeOption[]) {
	const preferredOption = options.find((option) =>
		PREFERRED_COUNTRY_IDENTIFIERS.has(option.iso_code)
	);

	return preferredOption?.iso_code ?? options[0]?.iso_code ?? '';
}

export async function fetchCountryCodeOptions(
	endpoint: string,
	locale?: string
): Promise<CountryCodeOption[]> {
	const url = new URL(endpoint, 'http://localhost');
	if (locale) {
		url.searchParams.set('lang', locale);
	}

	const requestUrl =
		url.origin === 'http://localhost'
			? `${url.pathname}${url.search}`
			: url.toString();

	return runWithInFlightDeduplication(`GET:${requestUrl}`, async () => {
		const cachedOptions = countryCodeOptionsCache.get(requestUrl);
		if (cachedOptions) {
			return cachedOptions;
		}

		try {
			const response = await fetch(requestUrl, {
				cache: 'no-store'
			});

			if (!response.ok) {
				return getFallbackCountryCodeOptions();
			}

			const payload = (await response.json()) as unknown;
			const options = parseCountryCodeOptions(payload);
			const resolvedOptions =
				options.length > 0 ? options : getFallbackCountryCodeOptions();
			countryCodeOptionsCache.set(requestUrl, resolvedOptions);
			return resolvedOptions;
		} catch {
			return getFallbackCountryCodeOptions();
		}
	});
}
