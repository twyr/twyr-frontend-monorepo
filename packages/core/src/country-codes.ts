export type CountryCodeOption = {
	id?: string;
	iso_code: string;
	country_name: string;
	is_enabled?: boolean;
};

export function parseCountryCodeOptions(payload: unknown): CountryCodeOption[] {
	const countryCodes = Array.isArray(payload)
		? payload
		: Array.isArray((payload as { data?: unknown[] }).data)
			? (payload as { data: unknown[] }).data
			: [];

	return countryCodes
		.filter(
			(value): value is CountryCodeOption =>
				typeof value === 'object' &&
				value !== null &&
				typeof (value as { iso_code?: unknown }).iso_code ===
					'string' &&
				typeof (value as { country_name?: unknown }).country_name ===
					'string' &&
				((value as { is_enabled?: unknown }).is_enabled === undefined ||
					typeof (value as { is_enabled?: unknown }).is_enabled ===
						'boolean')
		)
		.map((value) => ({
			id:
				typeof (value as { id?: unknown }).id === 'string'
					? (value as { id: string }).id
					: undefined,
			iso_code: value.iso_code,
			country_name: value.country_name,
			is_enabled:
				typeof (value as { is_enabled?: unknown }).is_enabled ===
				'boolean'
					? (value as { is_enabled: boolean }).is_enabled
					: undefined
		}))
		.filter((value) => value.is_enabled !== false);
}

export async function fetchCountryCodeOptions(
	endpoint: string,
	locale?: string
): Promise<CountryCodeOption[]> {
	try {
		const url = new URL(endpoint, 'http://localhost');
		if (locale) {
			url.searchParams.set('lang', locale);
		}

		const response = await fetch(
			url.origin === 'http://localhost'
				? `${url.pathname}${url.search}`
				: url.toString(),
			{
				cache: 'no-store'
			}
		);

		if (!response.ok) {
			return [];
		}

		const payload = (await response.json()) as unknown;
		return parseCountryCodeOptions(payload);
	} catch {
		return [];
	}
}
