export type AuthServerEnvironment = {
	AUTH_SERVER_PROTOCOL?: string;
	AUTH_SERVER_IP?: string;
	AUTH_SERVER_PORT?: string;
};

export type BuildAuthServerUrlOptions = {
	locale?: string | null;
	cookieHeader?: string | null;
};

export const DEFAULT_AUTH_SERVER_LOCALE = 'en-IN';
export const AUTH_SERVER_LOCALE_COOKIE_NAME = 'twyr_locale';

function getDefaultEnvironment(): AuthServerEnvironment {
	const processLike =
		typeof globalThis === 'object' &&
		globalThis !== null &&
		'process' in globalThis
			? (globalThis as { process?: { env?: AuthServerEnvironment } })
					.process
			: undefined;

	return processLike?.env ?? {};
}

export function resolveAuthServerBaseUrl(
	env: AuthServerEnvironment = getDefaultEnvironment()
): string {
	const protocol = env.AUTH_SERVER_PROTOCOL ?? 'http';
	const host = env.AUTH_SERVER_IP ?? 'localhost';
	const port = env.AUTH_SERVER_PORT ?? '9090';

	return `${protocol}://${host}:${port}`;
}

function normalizeLocale(value?: string | null): string {
	if (!value) {
		return DEFAULT_AUTH_SERVER_LOCALE;
	}

	const trimmedValue = value.trim();
	return trimmedValue.length > 0 ? trimmedValue : DEFAULT_AUTH_SERVER_LOCALE;
}

function getLocaleFromCookieHeader(
	cookieHeader?: string | null
): string | null {
	if (!cookieHeader) {
		return null;
	}

	for (const cookie of cookieHeader.split(';')) {
		const trimmedCookie = cookie.trim();
		if (!trimmedCookie.startsWith(`${AUTH_SERVER_LOCALE_COOKIE_NAME}=`)) {
			continue;
		}

		const localeValue = trimmedCookie.slice(
			AUTH_SERVER_LOCALE_COOKIE_NAME.length + 1
		);
		return decodeURIComponent(localeValue);
	}

	return null;
}

export function buildAuthServerUrl(
	path: string,
	options: BuildAuthServerUrlOptions = {},
	env: AuthServerEnvironment = getDefaultEnvironment()
): string {
	const baseUrl = resolveAuthServerBaseUrl(env);
	const url = new URL(path, baseUrl);
	const locale = normalizeLocale(
		options.locale ?? getLocaleFromCookieHeader(options.cookieHeader)
	);

	url.searchParams.set('lang', locale);

	return url.toString();
}
