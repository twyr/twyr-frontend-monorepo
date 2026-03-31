type CookieSetter = {
	cookies: {
		set: (
			name: string,
			value: string,
			options?: {
				httpOnly?: boolean;
				secure?: boolean;
				path?: string;
				expires?: Date;
				maxAge?: number;
				sameSite?: 'lax' | 'strict' | 'none';
			}
		) => void;
	};
};

function isProductionEnvironment() {
	const processLike =
		typeof globalThis === 'object' &&
		globalThis !== null &&
		'process' in globalThis
			? (globalThis as { process?: { env?: { NODE_ENV?: string } } })
					.process
			: undefined;

	return processLike?.env?.NODE_ENV === 'production';
}

export function getUpstreamErrorMessage(error: unknown): string {
	return error instanceof Error
		? error.message
		: 'Failed to call the core platform.';
}

export function splitSetCookieHeader(headerValue: string) {
	const cookies: string[] = [];
	let start = 0;
	let inExpires = false;

	for (let index = 0; index < headerValue.length; index += 1) {
		const currentSlice = headerValue.slice(index).toLowerCase();

		if (currentSlice.startsWith('expires=')) {
			inExpires = true;
		}

		// eslint-disable-next-line security/detect-object-injection
		const character = headerValue[index];
		if (character === ';' && inExpires) {
			inExpires = false;
			continue;
		}

		if (character === ',' && !inExpires) {
			const cookie = headerValue.slice(start, index).trim();
			if (cookie) {
				cookies.push(cookie);
			}
			start = index + 1;
		}
	}

	const finalCookie = headerValue.slice(start).trim();
	if (finalCookie) {
		cookies.push(finalCookie);
	}

	return cookies;
}

export function readSetCookieHeaders(headers: Headers) {
	const withGetSetCookie = headers as Headers & {
		getSetCookie?: () => string[];
	};
	const setCookieList = withGetSetCookie.getSetCookie?.() ?? [];

	if (setCookieList.length > 0) {
		return setCookieList;
	}

	const mergedSetCookie = headers.get('set-cookie');
	return mergedSetCookie ? splitSetCookieHeader(mergedSetCookie) : [];
}

function parseSameSite(value: string) {
	const normalized = value.toLowerCase();
	if (normalized === 'strict') {
		return 'strict';
	}
	if (normalized === 'none') {
		return isProductionEnvironment() ? 'none' : 'lax';
	}
	return 'lax';
}

function applyProxiedSetCookie(response: CookieSetter, setCookie: string) {
	const parts = setCookie.split(';').map((part) => part.trim());
	const [nameValue, ...attributes] = parts;
	const separatorIndex = nameValue.indexOf('=');
	if (separatorIndex <= 0) {
		return;
	}

	const name = nameValue.slice(0, separatorIndex).trim();
	const value = nameValue.slice(separatorIndex + 1);

	let path = '/';
	let httpOnly = false;
	let secure = isProductionEnvironment();
	let expires: Date | undefined;
	let maxAge: number | undefined;
	let sameSite: 'lax' | 'strict' | 'none' = 'lax';

	for (const attribute of attributes) {
		const [rawKey, ...rawValueParts] = attribute.split('=');
		const key = rawKey.trim().toLowerCase();
		const rawValue = rawValueParts.join('=').trim();

		if (key === 'httponly') {
			httpOnly = true;
			continue;
		}

		if (key === 'secure') {
			secure = isProductionEnvironment();
			continue;
		}

		if (key === 'path' && rawValue) {
			path = '/';
			continue;
		}

		if (key === 'expires' && rawValue) {
			const parsedDate = new Date(rawValue);
			if (!Number.isNaN(parsedDate.getTime())) {
				expires = parsedDate;
			}
			continue;
		}

		if (key === 'max-age' && rawValue) {
			const parsedMaxAge = Number.parseInt(rawValue, 10);
			if (!Number.isNaN(parsedMaxAge)) {
				maxAge = parsedMaxAge;
			}
			continue;
		}

		if (key === 'samesite' && rawValue) {
			sameSite = parseSameSite(rawValue);
		}
	}

	response.cookies.set(name, value, {
		httpOnly,
		secure,
		path,
		expires,
		maxAge,
		sameSite
	});
}

export function applyProxiedSetCookies(
	response: CookieSetter,
	upstreamHeaders: Headers
) {
	for (const setCookie of readSetCookieHeaders(upstreamHeaders)) {
		applyProxiedSetCookie(response, setCookie);
	}
}
