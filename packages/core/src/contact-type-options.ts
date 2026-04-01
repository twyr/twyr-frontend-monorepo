import {
	DEFAULT_APP_LANGUAGE,
	normalizeAppLanguage,
	type AppLanguageCode
} from './languages';

export type ContactTypeOption = {
	id?: string;
	name: string;
	displayName: string;
};

export function parseContactTypeOptions(payload: unknown): ContactTypeOption[] {
	const data = Array.isArray(payload)
		? payload
		: Array.isArray((payload as { data?: unknown[] }).data)
			? (payload as { data: unknown[] }).data
			: [];

	const options: ContactTypeOption[] = [];

	for (const entry of data) {
		if (typeof entry !== 'object' || entry === null) {
			continue;
		}

		const typedEntry = entry as {
			id?: unknown;
			contact_type_id?: unknown;
			name?: unknown;
			display_name?: unknown;
			attributes?: {
				name?: unknown;
				display_name?: unknown;
				contact_type_id?: unknown;
			};
		};
		const name =
			typeof typedEntry.attributes?.name === 'string'
				? typedEntry.attributes.name
				: typeof typedEntry.name === 'string'
					? typedEntry.name
					: '';

		if (!name.trim()) {
			continue;
		}

		const displayName =
			typeof typedEntry.attributes?.display_name === 'string'
				? typedEntry.attributes.display_name
				: typeof typedEntry.display_name === 'string'
					? typedEntry.display_name
					: name;

		options.push({
			id:
				typeof typedEntry.attributes?.contact_type_id === 'string'
					? typedEntry.attributes.contact_type_id
					: typeof typedEntry.contact_type_id === 'string'
						? typedEntry.contact_type_id
						: typeof typedEntry.id === 'string'
							? typedEntry.id
							: undefined,
			name: name.trim(),
			displayName: displayName.trim() || name.trim()
		});
	}

	return options;
}

export async function fetchContactTypeOptions(
	endpoint: string,
	locale: AppLanguageCode = DEFAULT_APP_LANGUAGE
): Promise<ContactTypeOption[]> {
	try {
		const url = new URL(endpoint, 'http://localhost');
		url.searchParams.set('lang', normalizeAppLanguage(locale));

		const response = await fetch(
			url.origin === 'http://localhost'
				? `${url.pathname}${url.search}`
				: url.toString(),
			{
				cache: 'no-store',
				credentials: 'include'
			}
		);

		if (!response.ok) {
			return [];
		}

		return parseContactTypeOptions((await response.json()) as unknown);
	} catch {
		return [];
	}
}
