import {
	DEFAULT_APP_LANGUAGE,
	normalizeAppLanguage,
	type AppLanguageCode
} from './languages';
import { runWithInFlightDeduplication } from './inflight-requests';

export type GenderOption = {
	id: string;
	label: string;
};

export function parseGenderOptions(payload: unknown): GenderOption[] {
	const data = Array.isArray(payload)
		? payload
		: Array.isArray((payload as { data?: unknown[] }).data)
			? (payload as { data: unknown[] }).data
			: [];

	const options: GenderOption[] = [];

	for (const entry of data) {
		if (typeof entry !== 'object' || entry === null) {
			continue;
		}

		const typedEntry = entry as {
			id?: unknown;
			gender_id?: unknown;
			code?: unknown;
			name?: unknown;
			display_name?: unknown;
			gender_name?: unknown;
			attributes?: {
				id?: unknown;
				gender_id?: unknown;
				code?: unknown;
				name?: unknown;
				display_name?: unknown;
				gender_name?: unknown;
			};
		};

		const id =
			typeof typedEntry.attributes?.gender_id === 'string'
				? typedEntry.attributes.gender_id
				: typeof typedEntry.gender_id === 'string'
					? typedEntry.gender_id
					: typeof typedEntry.attributes?.code === 'string'
						? typedEntry.attributes.code
						: typeof typedEntry.code === 'string'
							? typedEntry.code
							: typeof typedEntry.attributes?.id === 'string'
								? typedEntry.attributes.id
								: typeof typedEntry.id === 'string'
									? typedEntry.id
									: '';
		const label =
			typeof typedEntry.attributes?.display_name === 'string'
				? typedEntry.attributes.display_name
				: typeof typedEntry.display_name === 'string'
					? typedEntry.display_name
					: typeof typedEntry.attributes?.gender_name === 'string'
						? typedEntry.attributes.gender_name
						: typeof typedEntry.gender_name === 'string'
							? typedEntry.gender_name
							: typeof typedEntry.attributes?.name === 'string'
								? typedEntry.attributes.name
								: typeof typedEntry.name === 'string'
									? typedEntry.name
									: id;

		if (!id.trim() || !label.trim()) {
			continue;
		}

		options.push({
			id: id.trim(),
			label: label.trim()
		});
	}

	return options;
}

export async function fetchGenderOptions(
	endpoint: string,
	locale: AppLanguageCode = DEFAULT_APP_LANGUAGE
): Promise<GenderOption[]> {
	const url = new URL(endpoint, 'http://localhost');
	url.searchParams.set('lang', normalizeAppLanguage(locale));

	const requestUrl =
		url.origin === 'http://localhost'
			? `${url.pathname}${url.search}`
			: url.toString();

	return runWithInFlightDeduplication(`GET:${requestUrl}`, async () => {
		try {
			const response = await fetch(requestUrl, {
				cache: 'no-store',
				credentials: 'include'
			});

			if (!response.ok) {
				return [];
			}

			return parseGenderOptions((await response.json()) as unknown);
		} catch {
			return [];
		}
	});
}
