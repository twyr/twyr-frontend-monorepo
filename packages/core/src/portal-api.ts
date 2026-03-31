import type { AppLanguageCode } from './languages';

export type PortalActor = 'users' | 'system_administrators';

export type PortalRegistrationDraft = {
	phoneNumber: string;
	otp: string;
	firstName: string;
	middleNames: string;
	lastName: string;
	email: string;
	organization: string;
	roleTitle: string;
};

export type PortalProfileInput = {
	displayName: string;
	email: string;
	phoneNumber: string;
	organization: string;
	roleTitle: string;
};

export type PortalAction =
	| 'generate-otp'
	| 'validate-otp'
	| 'login'
	| 'logout'
	| 'validate-session'
	| 'profile'
	| 'profile-create'
	| 'profile-update';

const PORTAL_SEGMENTS: Record<PortalActor, string> = {
	users: 'users',
	system_administrators: 'system-admin'
};

const PORTAL_ENTITY_TYPES: Record<PortalActor, string> = {
	users: 'user',
	system_administrators: 'system_administrator'
};

const PORTAL_ACTION_PATHS: Record<PortalAction, string> = {
	'generate-otp': 'session-manager/generate-otp',
	'validate-otp': 'session-manager/validate-otp',
	login: 'session-manager/login',
	logout: 'session-manager/logout',
	'validate-session': 'session-manager/validate-session',
	profile: 'profile',
	'profile-create': 'profile/create',
	'profile-update': 'profile/update'
};

const NAME_ATTRIBUTE_KEYS = [
	'first_name',
	'middle_names',
	'last_name',
	'nickname',
	'display_name'
] as const;

const INDIA_COUNTRY_CODE = '+91';

export function getPortalApiPath(
	actor: PortalActor,
	action: PortalAction
): string {
	// eslint-disable-next-line security/detect-object-injection
	return `/api/v1/${PORTAL_SEGMENTS[actor]}/${PORTAL_ACTION_PATHS[action]}`;
}

export function withLanguageQuery(
	path: string,
	locale?: string | null
): string {
	if (!locale) {
		return path;
	}

	const url = new URL(path, 'http://localhost');
	url.searchParams.set('lang', locale);

	return url.origin === 'http://localhost'
		? `${url.pathname}${url.search}`
		: url.toString();
}

export function buildPortalUsername(phoneNumber: string): string {
	return `${INDIA_COUNTRY_CODE}${phoneNumber.replace(/\D/g, '').slice(-10)}`;
}

export function buildPortalRegistrationPayload(
	actor: PortalActor,
	draft: PortalRegistrationDraft
) {
	return {
		data: {
			// eslint-disable-next-line security/detect-object-injection
			type: PORTAL_ENTITY_TYPES[actor],
			attributes: {
				mobile_no: buildPortalUsername(draft.phoneNumber),
				first_name: draft.firstName.trim(),
				middle_names: draft.middleNames.trim(),
				last_name: draft.lastName.trim(),
				email: draft.email.trim(),
				organization_name: draft.organization.trim(),
				role_title: draft.roleTitle.trim(),
				otp: draft.otp.trim()
			}
		}
	};
}

export function buildPortalProfileUpdatePayload(
	actor: PortalActor,
	profile: PortalProfileInput
) {
	return {
		data: {
			// eslint-disable-next-line security/detect-object-injection
			type: PORTAL_ENTITY_TYPES[actor],
			attributes: {
				display_name: profile.displayName.trim(),
				email: profile.email.trim(),
				mobile_no: buildPortalUsername(profile.phoneNumber),
				organization_name: profile.organization.trim(),
				role_title: profile.roleTitle.trim()
			}
		}
	};
}

export function withNameLocale(body: string, locale: string | null) {
	if (!locale) {
		return body;
	}

	try {
		const parsed = JSON.parse(body) as {
			data?: { attributes?: Record<string, unknown> };
		};
		const attributes = parsed.data?.attributes;

		if (!attributes) {
			return body;
		}

		const hasNameAttributes = NAME_ATTRIBUTE_KEYS.some((key) =>
			Object.hasOwn(attributes, key)
		);
		if (!hasNameAttributes) {
			return body;
		}

		return JSON.stringify({
			...parsed,
			data: {
				...parsed.data,
				attributes: {
					...attributes,
					locale_id: locale
				}
			}
		});
	} catch {
		return body;
	}
}

export async function readApiErrorMessage(
	response: Response
): Promise<string | null> {
	const rawResponse = (await response.text()).trim();
	return extractApiErrorMessage(rawResponse);
}

export function extractApiErrorMessage(rawResponse: string): string | null {
	if (!rawResponse) {
		return null;
	}

	try {
		const parsed = JSON.parse(rawResponse) as {
			error?: unknown;
			message?: unknown;
			errors?: unknown;
		};

		if (typeof parsed.error === 'string' && parsed.error.trim()) {
			return parsed.error.trim();
		}

		if (typeof parsed.message === 'string' && parsed.message.trim()) {
			return parsed.message.trim();
		}

		if (Array.isArray(parsed.errors)) {
			for (const entry of parsed.errors) {
				if (
					typeof entry === 'object' &&
					entry !== null &&
					typeof (entry as { message?: unknown }).message === 'string'
				) {
					return (
						(entry as { message: string }).message ?? ''
					).trim();
				}
			}
		}
	} catch {
		return rawResponse;
	}

	return rawResponse;
}

function getAttributes(payload: unknown): Record<string, unknown> {
	if (typeof payload !== 'object' || payload === null) {
		return {};
	}

	const typedPayload = payload as {
		data?: { attributes?: Record<string, unknown> } | unknown[];
		attributes?: Record<string, unknown>;
	};
	if (
		typedPayload.data &&
		!Array.isArray(typedPayload.data) &&
		typeof typedPayload.data === 'object' &&
		typedPayload.data !== null &&
		typedPayload.data.attributes
	) {
		return typedPayload.data.attributes;
	}

	if (
		Array.isArray(typedPayload.data) &&
		typedPayload.data.length > 0 &&
		typeof typedPayload.data[0] === 'object' &&
		typedPayload.data[0] !== null &&
		typeof (typedPayload.data[0] as { attributes?: unknown }).attributes ===
			'object'
	) {
		return ((
			typedPayload.data[0] as { attributes?: Record<string, unknown> }
		).attributes ?? {}) as Record<string, unknown>;
	}

	return typedPayload.attributes ?? {};
}

function asString(value: unknown): string {
	return typeof value === 'string' ? value.trim() : '';
}

function normalizePhoneNumber(value: unknown): string {
	const digits = asString(value).replace(/\D/g, '');
	return digits.length > 10 ? digits.slice(-10) : digits;
}

export function mapPortalProfilePayload(
	payload: unknown,
	fallback: PortalProfileInput
): PortalProfileInput {
	const attributes = getAttributes(payload);
	const firstName = asString(attributes.first_name);
	const middleNames = asString(attributes.middle_names);
	const lastName = asString(attributes.last_name);
	const displayName =
		asString(attributes.display_name) ||
		[firstName, middleNames, lastName].filter(Boolean).join(' ') ||
		fallback.displayName;

	return {
		displayName,
		email:
			asString(attributes.email) ||
			asString(attributes.email_address) ||
			fallback.email,
		phoneNumber:
			normalizePhoneNumber(attributes.mobile_no) || fallback.phoneNumber,
		organization:
			asString(attributes.organization_name) ||
			asString(attributes.organization) ||
			fallback.organization,
		roleTitle:
			asString(attributes.role_title) ||
			asString(attributes.role) ||
			asString(attributes.sub_role_name) ||
			fallback.roleTitle
	};
}

type PortalApiClientOptions = {
	actor: PortalActor;
	buildUrl: (path: string, locale?: AppLanguageCode) => string;
};

async function ensureSuccess(
	response: Response,
	fallbackMessage: string
): Promise<Response> {
	if (response.ok) {
		return response;
	}

	throw new Error((await readApiErrorMessage(response)) ?? fallbackMessage);
}

export function createPortalApiClient({
	actor,
	buildUrl
}: PortalApiClientOptions) {
	const request = async (
		action: PortalAction,
		init: RequestInit,
		locale?: AppLanguageCode
	) => {
		const response = await fetch(
			buildUrl(getPortalApiPath(actor, action), locale),
			{
				cache: 'no-store',
				credentials: 'include',
				...init
			}
		);

		return response;
	};

	return {
		requestOtp: async (phoneNumber: string, locale?: AppLanguageCode) => {
			const response = await request(
				'generate-otp',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: buildPortalUsername(phoneNumber)
					})
				},
				locale
			);
			await ensureSuccess(response, 'Unable to generate OTP.');

			return (await response.text()).trim();
		},
		validateOtp: async (
			phoneNumber: string,
			otp: string,
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'validate-otp',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: buildPortalUsername(phoneNumber),
						password: otp.trim()
					})
				},
				locale
			);
			await ensureSuccess(response, 'Unable to validate OTP.');
		},
		login: async (
			phoneNumber: string,
			otp: string,
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username: buildPortalUsername(phoneNumber),
						password: otp.trim()
					})
				},
				locale
			);
			await ensureSuccess(response, 'Unable to complete login.');
		},
		logout: async (locale?: AppLanguageCode) => {
			const response = await request(
				'logout',
				{
					method: 'POST'
				},
				locale
			);
			await ensureSuccess(response, 'Unable to complete logout.');
		},
		validateSession: async (locale?: AppLanguageCode) => {
			const response = await request(
				'validate-session',
				{
					method: 'GET'
				},
				locale
			);

			if (!response.ok) {
				return false;
			}

			const payload = (await response.json()) as {
				authenticated?: unknown;
			};
			return payload.authenticated === true;
		},
		fetchProfile: async (
			fallback: PortalProfileInput,
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile',
				{
					method: 'GET'
				},
				locale
			);
			await ensureSuccess(response, 'Unable to load the profile.');

			const payload = (await response.json()) as unknown;
			return mapPortalProfilePayload(payload, fallback);
		},
		register: async (
			draft: PortalRegistrationDraft,
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-create',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						buildPortalRegistrationPayload(actor, draft)
					)
				},
				locale
			);
			await ensureSuccess(response, 'Unable to create the profile.');
		},
		updateProfile: async (
			profile: PortalProfileInput,
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-update',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						buildPortalProfileUpdatePayload(actor, profile)
					)
				},
				locale
			);
			await ensureSuccess(response, 'Unable to update the profile.');
		}
	};
}
