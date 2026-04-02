import type { AppLanguageCode } from './languages';
import { normalizeDateOnlyValue } from './date-only';
import { runWithInFlightDeduplication } from './inflight-requests';

export type PortalActor = 'users' | 'system_administrators';

export type PortalRegistrationDraft = {
	phoneNumber: string;
	otp: string;
	firstName: string;
	middleNames: string;
	lastName: string;
	nickname: string;
	genderId: string;
	dateOfBirth: string;
};

export type PortalProfileInput = {
	id?: string;
	actorType: PortalActor;
	genderId: string;
	dateOfBirth: string;
	names: Array<{
		id?: string;
		localeCode: string;
		firstName: string;
		middleNames: string;
		lastName: string;
		nickname: string;
	}>;
	contacts: Array<{
		id?: string;
		typeName: string;
		typeId?: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}>;
	locales: Array<{
		id?: string;
		localeCode: string;
		localeId: string;
		isPrimary: boolean;
	}>;
};

export type PortalLoginResult = {
	primaryLocale?: AppLanguageCode;
};

export type PortalAction =
	| 'generate-otp'
	| 'validate-otp'
	| 'login'
	| 'logout'
	| 'validate-session'
	| 'profile'
	| 'profile-create'
	| 'profile-update'
	| 'profile-locale-create'
	| 'profile-locale-update'
	| 'profile-locale-delete'
	| 'profile-contact-create'
	| 'profile-contact-update'
	| 'profile-contact-delete';

const PORTAL_SEGMENTS: Record<PortalActor, string> = {
	users: 'users',
	system_administrators: 'system-admin'
};

const PORTAL_ENTITY_TYPES: Record<PortalActor, string> = {
	users: 'user',
	system_administrators: 'system_administrator'
};

const PORTAL_PROFILE_UPDATE_ENTITY_TYPES: Record<PortalActor, string> = {
	users: 'user',
	system_administrators: 'system_admin'
};

const PORTAL_CONTACT_ENTITY_TYPES: Record<PortalActor, string> = {
	users: 'user_contact',
	system_administrators: 'system_admin_contact'
};

const PORTAL_LOCALE_ENTITY_TYPES: Record<PortalActor, string> = {
	users: 'user_locale',
	system_administrators: 'system_admin_locale'
};

const PORTAL_ACTION_PATHS: Record<PortalAction, string> = {
	'generate-otp': 'session-manager/generate-otp',
	'validate-otp': 'session-manager/validate-otp',
	login: 'session-manager/login',
	logout: 'session-manager/logout',
	'validate-session': 'session-manager/validate-session',
	profile: 'profile',
	'profile-create': 'profile/create',
	'profile-update': 'profile/update',
	'profile-locale-create': 'profile/locale/create',
	'profile-locale-update': 'profile/locale/update',
	'profile-locale-delete': 'profile/locale/delete',
	'profile-contact-create': 'profile/contact/create',
	'profile-contact-update': 'profile/contact/update',
	'profile-contact-delete': 'profile/contact/delete'
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
				nickname: draft.nickname.trim(),
				gender_id: draft.genderId.trim(),
				date_of_birth: normalizeDateOnlyValue(draft.dateOfBirth),
				otp: draft.otp.trim()
			}
		}
	};
}

export function buildPortalProfileUpdatePayload(
	actor: PortalActor,
	profile: PortalProfileInput,
	previousProfile?: PortalProfileInput
) {
	const primaryLocale =
		profile.locales.find((locale) => locale.isPrimary) ??
		profile.locales[0];
	const primaryName =
		profile.names.find(
			(name) =>
				name.localeCode ===
				(primaryLocale?.localeCode ?? profile.names[0]?.localeCode)
		) ?? profile.names[0];
	const previousPrimaryLocale =
		previousProfile?.locales.find((locale) => locale.isPrimary) ??
		previousProfile?.locales[0];
	const previousPrimaryName =
		previousProfile?.names.find(
			(name) =>
				name.localeCode ===
				(previousPrimaryLocale?.localeCode ??
					previousProfile?.names[0]?.localeCode)
		) ?? previousProfile?.names[0];
	const attributes: Record<string, string> = {};

	if (
		!previousPrimaryName ||
		primaryName?.firstName.trim() !== previousPrimaryName.firstName.trim()
	) {
		attributes.first_name = primaryName?.firstName.trim() ?? '';
	}

	if (
		!previousPrimaryName ||
		primaryName?.middleNames.trim() !==
			previousPrimaryName.middleNames.trim()
	) {
		attributes.middle_names = primaryName?.middleNames.trim() ?? '';
	}

	if (
		!previousPrimaryName ||
		primaryName?.lastName.trim() !== previousPrimaryName.lastName.trim()
	) {
		attributes.last_name = primaryName?.lastName.trim() ?? '';
	}

	if (
		!previousPrimaryName ||
		primaryName?.nickname.trim() !== previousPrimaryName.nickname.trim()
	) {
		attributes.nickname = primaryName?.nickname.trim() ?? '';
	}

	if (Object.keys(attributes).length > 0) {
		attributes.locale_id =
			primaryName?.localeCode ?? primaryLocale?.localeCode ?? '';
	}

	if (
		!previousProfile ||
		profile.genderId.trim() !== previousProfile.genderId.trim()
	) {
		attributes.gender_id = profile.genderId.trim();
	}

	if (
		!previousProfile ||
		normalizeDateOnlyValue(profile.dateOfBirth) !==
			normalizeDateOnlyValue(previousProfile.dateOfBirth)
	) {
		attributes.date_of_birth = normalizeDateOnlyValue(profile.dateOfBirth);
	}

	return {
		data: {
			// eslint-disable-next-line security/detect-object-injection
			type: PORTAL_PROFILE_UPDATE_ENTITY_TYPES[actor],
			id: profile.id,
			attributes
		}
	};
}

export function buildPortalProfileContactCreatePayload(
	actor: PortalActor,
	contact: {
		typeId: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}
) {
	return {
		data: {
			// eslint-disable-next-line security/detect-object-injection
			type: PORTAL_CONTACT_ENTITY_TYPES[actor],
			attributes: {
				contact_type_id: contact.typeId,
				contact: contact.value.trim(),
				verified: contact.verified,
				is_primary: contact.isPrimary
			}
		}
	};
}

export function buildPortalProfileContactUpdatePayload(
	actor: PortalActor,
	contact: {
		id: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}
) {
	return {
		data: {
			// eslint-disable-next-line security/detect-object-injection
			type: PORTAL_CONTACT_ENTITY_TYPES[actor],
			id: contact.id,
			attributes: {
				contact: contact.value.trim(),
				verified: contact.verified,
				is_primary: contact.isPrimary
			}
		}
	};
}

export function buildPortalProfileLocaleCreatePayload(
	actor: PortalActor,
	locale: {
		localeId: string;
		isPrimary: boolean;
	}
) {
	return {
		data: {
			// eslint-disable-next-line security/detect-object-injection
			type: PORTAL_LOCALE_ENTITY_TYPES[actor],
			attributes: {
				locale_id: locale.localeId.trim(),
				is_primary: locale.isPrimary
			}
		}
	};
}

export function buildPortalProfileLocaleUpdatePayload(
	actor: PortalActor,
	locale: {
		id: string;
		localeId: string;
		isPrimary: boolean;
	}
) {
	return {
		data: {
			// eslint-disable-next-line security/detect-object-injection
			type: PORTAL_LOCALE_ENTITY_TYPES[actor],
			id: locale.id,
			attributes: {
				locale_id: locale.localeId.trim(),
				is_primary: locale.isPrimary
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

function getPrimaryData(payload: unknown): Record<string, unknown> | null {
	if (typeof payload !== 'object' || payload === null) {
		return null;
	}

	const typedPayload = payload as {
		data?: { id?: unknown; type?: unknown; attributes?: unknown };
	};

	if (
		typeof typedPayload.data === 'object' &&
		typedPayload.data !== null &&
		!Array.isArray(typedPayload.data)
	) {
		return typedPayload.data as Record<string, unknown>;
	}

	return null;
}

function getIncludedResources(
	payload: unknown
): Array<Record<string, unknown>> {
	if (typeof payload !== 'object' || payload === null) {
		return [];
	}

	return Array.isArray((payload as { included?: unknown[] }).included)
		? ((payload as { included: unknown[] }).included.filter(
				(entry): entry is Record<string, unknown> =>
					typeof entry === 'object' && entry !== null
			) as Array<Record<string, unknown>>)
		: [];
}

function getResourceKey(type: unknown, id: unknown): string {
	return `${asString(type)}:${asString(id)}`;
}

function getRelationshipEntries(
	resource: Record<string, unknown> | null,
	name: string
): Array<Record<string, unknown>> {
	const relationships =
		resource &&
		typeof resource.relationships === 'object' &&
		resource.relationships !== null
			? (resource.relationships as Record<string, unknown>)
			: null;
	const relationship =
		relationships &&
		// eslint-disable-next-line security/detect-object-injection
		typeof relationships[name] === 'object' &&
		// eslint-disable-next-line security/detect-object-injection
		relationships[name] !== null
			? // eslint-disable-next-line security/detect-object-injection
				(relationships[name] as Record<string, unknown>)
			: null;
	const data = relationship?.data;

	if (Array.isArray(data)) {
		return data.filter(
			(entry): entry is Record<string, unknown> =>
				typeof entry === 'object' && entry !== null
		);
	}

	if (typeof data === 'object' && data !== null) {
		return [data as Record<string, unknown>];
	}

	return [];
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
	const primaryData = getPrimaryData(payload);
	const attributes = getAttributes(payload);
	const includedResources = getIncludedResources(payload);
	const includedByKey = new Map<string, Record<string, unknown>>();

	for (const resource of includedResources) {
		includedByKey.set(getResourceKey(resource.type, resource.id), resource);
	}

	const contactResources = getRelationshipEntries(primaryData, 'contacts')
		.map((entry) => includedByKey.get(getResourceKey(entry.type, entry.id)))
		.filter(Boolean) as Array<Record<string, unknown>>;
	const localeResources = getRelationshipEntries(primaryData, 'locales')
		.map((entry) => includedByKey.get(getResourceKey(entry.type, entry.id)))
		.filter(Boolean) as Array<Record<string, unknown>>;
	const nameResources = getRelationshipEntries(primaryData, 'names')
		.map((entry) => includedByKey.get(getResourceKey(entry.type, entry.id)))
		.filter(Boolean) as Array<Record<string, unknown>>;

	const contacts =
		contactResources.length > 0
			? contactResources.map((resource) => {
					const resourceAttributes =
						typeof resource.attributes === 'object' &&
						resource.attributes !== null
							? (resource.attributes as Record<string, unknown>)
							: {};
					const contactTypeRelationship =
						getRelationshipEntries(resource, 'contactType')[0] ??
						null;
					const contactType =
						(contactTypeRelationship &&
							includedByKey.get(
								getResourceKey(
									contactTypeRelationship.type,
									contactTypeRelationship.id
								)
							)) ??
						null;
					const contactTypeAttributes =
						contactType &&
						typeof contactType.attributes === 'object' &&
						contactType.attributes !== null
							? (contactType.attributes as Record<
									string,
									unknown
								>)
							: {};

					return {
						id: asString(resource.id) || undefined,
						typeName:
							asString(contactTypeAttributes.name) ||
							asString(resourceAttributes.contact_type_name) ||
							'other',
						typeId:
							asString(resourceAttributes.contact_type_id) ||
							asString(contactType?.id) ||
							undefined,
						value:
							asString(resourceAttributes.contact) ||
							asString(resourceAttributes.value),
						verified: resourceAttributes.verified === true,
						isPrimary: resourceAttributes.is_primary === true
					};
				})
			: fallback.contacts;

	const locales =
		localeResources.length > 0
			? localeResources.map((resource) => {
					const resourceAttributes =
						typeof resource.attributes === 'object' &&
						resource.attributes !== null
							? (resource.attributes as Record<string, unknown>)
							: {};

					return {
						id: asString(resource.id) || undefined,
						localeCode:
							asString(resourceAttributes.locale_code) ||
							asString(resourceAttributes.locale_id),
						localeId:
							asString(resourceAttributes.locale_id) ||
							asString(resourceAttributes.locale_code),
						isPrimary: resourceAttributes.is_primary === true
					};
				})
			: fallback.locales;

	const names =
		nameResources.length > 0
			? nameResources.map((resource) => {
					const resourceAttributes =
						typeof resource.attributes === 'object' &&
						resource.attributes !== null
							? (resource.attributes as Record<string, unknown>)
							: {};

					return {
						id: asString(resource.id) || undefined,
						localeCode:
							asString(resourceAttributes.locale_code) ||
							asString(resourceAttributes.locale_id) ||
							fallback.names[0]?.localeCode ||
							fallback.locales[0]?.localeCode ||
							'',
						firstName: asString(resourceAttributes.first_name),
						middleNames: asString(resourceAttributes.middle_names),
						lastName: asString(resourceAttributes.last_name),
						nickname: asString(resourceAttributes.nickname)
					};
				})
			: [
					{
						id: undefined,
						localeCode:
							asString(attributes.locale_id) ||
							fallback.names[0]?.localeCode ||
							fallback.locales[0]?.localeCode ||
							'',
						firstName: asString(attributes.first_name),
						middleNames: asString(attributes.middle_names),
						lastName: asString(attributes.last_name),
						nickname: asString(attributes.nickname)
					}
				].filter(
					(name) =>
						name.firstName.length > 0 ||
						name.middleNames.length > 0 ||
						name.lastName.length > 0 ||
						name.nickname.length > 0
				);

	const fallbackMobile =
		normalizePhoneNumber(attributes.mobile_no) ||
		fallback.contacts.find((contact) => contact.typeName === 'mobile')
			?.value ||
		'';
	const fallbackEmail =
		asString(attributes.email) ||
		asString(attributes.email_address) ||
		fallback.contacts.find((contact) => contact.typeName === 'email')
			?.value ||
		'';

	const normalizedContacts =
		contacts.length > 0
			? contacts
			: [
					...(fallbackMobile
						? [
								{
									typeName: 'mobile',
									value: fallbackMobile,
									verified: false,
									isPrimary: true
								}
							]
						: []),
					...(fallbackEmail
						? [
								{
									typeName: 'email',
									value: fallbackEmail,
									verified: false,
									isPrimary: !fallbackMobile
								}
							]
						: [])
				];

	return {
		id: asString(primaryData?.id) || fallback.id,
		actorType:
			actorFromEntityType(
				asString(primaryData?.type) ||
					asString((attributes as { type?: unknown }).type)
			) ?? fallback.actorType,
		genderId: asString(attributes.gender_id) || fallback.genderId,
		dateOfBirth: normalizeDateOnlyValue(
			asString(attributes.date_of_birth) ||
				asString(attributes.dob) ||
				fallback.dateOfBirth
		),
		names: names.length > 0 ? names : fallback.names,
		contacts: normalizedContacts,
		locales: locales.length > 0 ? locales : fallback.locales
	};
}

function actorFromEntityType(type: string): PortalActor | null {
	if (type === 'user') {
		return 'users';
	}

	if (type === 'system_administrator') {
		return 'system_administrators';
	}

	return null;
}

function mapPortalLoginPayload(
	actor: PortalActor,
	payload: unknown
): PortalLoginResult {
	const loginPayload =
		typeof payload === 'object' &&
		payload !== null &&
		'body' in payload &&
		typeof (payload as { body?: unknown }).body === 'object' &&
		(payload as { body?: unknown }).body !== null
			? (payload as { body: unknown }).body
			: payload;
	const includedResources = getIncludedResources(loginPayload);
	const primaryLocaleResource = includedResources.find((resource) => {
		const attributes =
			typeof resource.attributes === 'object' &&
			resource.attributes !== null
				? (resource.attributes as Record<string, unknown>)
				: {};

		return (
			asString(resource.type) === PORTAL_LOCALE_ENTITY_TYPES[actor] &&
			attributes.is_primary === true
		);
	});

	if (!primaryLocaleResource) {
		return {};
	}

	const attributes =
		typeof primaryLocaleResource.attributes === 'object' &&
		primaryLocaleResource.attributes !== null
			? (primaryLocaleResource.attributes as Record<string, unknown>)
			: {};
	const primaryLocale =
		asString(attributes.locale_code) || asString(attributes.locale_id);

	return primaryLocale
		? { primaryLocale: primaryLocale as AppLanguageCode }
		: {};
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
		locale?: AppLanguageCode,
		pathOverride?: string
	) => {
		const response = await fetch(
			buildUrl(pathOverride ?? getPortalApiPath(actor, action), locale),
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

			const responseText = (await response.text()).trim();
			if (!responseText) {
				return '';
			}

			try {
				const payload = JSON.parse(responseText) as {
					message?: unknown;
				};

				return typeof payload.message === 'string'
					? payload.message.trim()
					: responseText;
			} catch {
				return responseText;
			}
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

			const responseText = (await response.text()).trim();
			if (!responseText) {
				return {};
			}

			try {
				return mapPortalLoginPayload(
					actor,
					JSON.parse(responseText) as unknown
				);
			} catch {
				return {};
			}
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
			const requestUrl = buildUrl(
				getPortalApiPath(actor, 'validate-session'),
				locale
			);

			return runWithInFlightDeduplication(
				`GET:${requestUrl}`,
				async () => {
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
				}
			);
		},
		fetchProfile: async (
			fallback: PortalProfileInput,
			locale?: AppLanguageCode
		) => {
			const requestUrl = buildUrl(
				getPortalApiPath(actor, 'profile'),
				locale
			);

			return runWithInFlightDeduplication(
				`GET:${requestUrl}`,
				async () => {
					const response = await request(
						'profile',
						{
							method: 'GET'
						},
						locale
					);
					await ensureSuccess(
						response,
						'Unable to load the profile.'
					);

					const payload = (await response.json()) as unknown;
					return mapPortalProfilePayload(payload, fallback);
				}
			);
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
			previousProfile?: PortalProfileInput,
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
						buildPortalProfileUpdatePayload(
							actor,
							profile,
							previousProfile
						)
					)
				},
				locale
			);
			await ensureSuccess(response, 'Unable to update the profile.');
		},
		createProfileLocale: async (
			localePayload: {
				localeId: string;
				isPrimary: boolean;
			},
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-locale-create',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						buildPortalProfileLocaleCreatePayload(
							actor,
							localePayload
						)
					)
				},
				locale
			);
			await ensureSuccess(
				response,
				'Unable to create the profile locale.'
			);

			return (await response.text()).trim();
		},
		updateProfileLocale: async (
			localePayload: {
				id: string;
				localeId: string;
				isPrimary: boolean;
			},
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-locale-update',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						buildPortalProfileLocaleUpdatePayload(
							actor,
							localePayload
						)
					)
				},
				locale
			);
			await ensureSuccess(
				response,
				'Unable to update the profile locale.'
			);

			return (await response.text()).trim();
		},
		deleteProfileLocale: async (
			localeId: string,
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-locale-delete',
				{
					method: 'DELETE'
				},
				locale,
				`${getPortalApiPath(actor, 'profile-locale-delete')}/${localeId}`
			);
			if (response.status === 204) {
				return;
			}

			throw new Error(
				(await readApiErrorMessage(response)) ??
					'Unable to delete the profile locale.'
			);
		},
		createProfileContact: async (
			contact: {
				typeId: string;
				value: string;
				verified: boolean;
				isPrimary: boolean;
			},
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-contact-create',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						buildPortalProfileContactCreatePayload(actor, contact)
					)
				},
				locale
			);
			await ensureSuccess(
				response,
				'Unable to create the profile contact.'
			);

			return (await response.text()).trim();
		},
		updateProfileContact: async (
			contact: {
				id: string;
				value: string;
				verified: boolean;
				isPrimary: boolean;
			},
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-contact-update',
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(
						buildPortalProfileContactUpdatePayload(actor, contact)
					)
				},
				locale
			);
			await ensureSuccess(
				response,
				'Unable to update the profile contact.'
			);

			return (await response.text()).trim();
		},
		deleteProfileContact: async (
			contactId: string,
			locale?: AppLanguageCode
		) => {
			const response = await request(
				'profile-contact-delete',
				{
					method: 'DELETE'
				},
				locale,
				`${getPortalApiPath(actor, 'profile-contact-delete')}/${contactId}`
			);
			if (response.status === 204) {
				return;
			}

			throw new Error(
				(await readApiErrorMessage(response)) ??
					'Unable to delete the profile contact.'
			);
		}
	};
}
