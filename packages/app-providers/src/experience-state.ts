import {
	APP_LANGUAGE_OPTIONS,
	createDemoOtp,
	DEFAULT_APP_LANGUAGE,
	normalizeAppLanguage,
	type AppLanguageCode,
	type DemoActor
} from '@twyr/core';

export type ExperienceActor = DemoActor;

export type ExperienceLanguageOption = {
	code: AppLanguageCode;
	label: string;
};

export type ExperienceProfile = {
	id?: string;
	actorType: ExperienceActor;
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

export type ExperienceActorState = {
	authenticated: boolean;
	sessionResolved: boolean;
	skipNextProfileFetch: boolean;
	language: AppLanguageCode;
	sidebarCollapsed: boolean;
	pendingOtp: string | null;
	pendingPhoneNumber: string;
	profile: ExperienceProfile;
};

export type ExperienceState = Record<ExperienceActor, ExperienceActorState>;

export type RegistrationDraft = {
	phoneNumber: string;
	otp: string;
	firstName: string;
	middleNames: string;
	lastName: string;
	email: string;
	organization: string;
	roleTitle: string;
};

export const experienceLanguageOptions: ExperienceLanguageOption[] =
	APP_LANGUAGE_OPTIONS.map((option) => ({
		code: option.code,
		label: option.label
	}));

export function normalizeExperienceLanguageOptions(
	options: readonly ExperienceLanguageOption[]
): ExperienceLanguageOption[] {
	const normalizedOptions = options
		.filter(
			(option): option is ExperienceLanguageOption =>
				typeof option === 'object' &&
				option !== null &&
				typeof option.code === 'string' &&
				typeof option.label === 'string'
		)
		.map((option) => ({
			code: normalizeAppLanguage(option.code),
			label: option.label.trim()
		}))
		.filter((option) => option.label.length > 0);

	if (normalizedOptions.length === 0) {
		return [...experienceLanguageOptions];
	}

	const dedupedOptions = new Map<AppLanguageCode, ExperienceLanguageOption>();
	for (const option of normalizedOptions) {
		if (!dedupedOptions.has(option.code)) {
			dedupedOptions.set(option.code, option);
		}
	}

	return Array.from(dedupedOptions.values());
}

function defaultProfile(actor: ExperienceActor): ExperienceProfile {
	return {
		actorType: actor,
		genderId: '',
		dateOfBirth: '',
		names: [
			{
				localeCode: DEFAULT_APP_LANGUAGE,
				firstName:
					actor === 'system_administrators' ? 'System' : 'Twyr',
				middleNames: '',
				lastName:
					actor === 'system_administrators'
						? 'Administrator'
						: 'User',
				nickname: ''
			}
		],
		contacts: [],
		locales: [
			{
				localeCode: DEFAULT_APP_LANGUAGE,
				localeId: DEFAULT_APP_LANGUAGE,
				isPrimary: true
			}
		]
	};
}

function defaultActorState(actor: ExperienceActor): ExperienceActorState {
	return {
		authenticated: false,
		sessionResolved: false,
		skipNextProfileFetch: false,
		language: DEFAULT_APP_LANGUAGE,
		sidebarCollapsed: false,
		pendingOtp: null,
		pendingPhoneNumber: '',
		profile: defaultProfile(actor)
	};
}

export function createDefaultExperienceState(): ExperienceState {
	return {
		users: defaultActorState('users'),
		system_administrators: defaultActorState('system_administrators')
	};
}

export function normalizeExperienceState(payload: unknown): ExperienceState {
	const defaultState = createDefaultExperienceState();

	if (typeof payload !== 'object' || payload === null) {
		return defaultState;
	}

	const typedPayload = payload as Partial<Record<ExperienceActor, unknown>>;

	return {
		users: normalizeActorState('users', typedPayload.users),
		system_administrators: normalizeActorState(
			'system_administrators',
			typedPayload.system_administrators
		)
	};
}

export function resetStoredSessionResolution(
	state: ExperienceState
): ExperienceState {
	return {
		users: state.users.authenticated
			? {
					...state.users,
					sessionResolved: false,
					skipNextProfileFetch: false
				}
			: state.users,
		system_administrators: state.system_administrators.authenticated
			? {
					...state.system_administrators,
					sessionResolved: false,
					skipNextProfileFetch: false
				}
			: state.system_administrators
	};
}

function normalizeActorState(
	actor: ExperienceActor,
	payload: unknown
): ExperienceActorState {
	const fallback = defaultActorState(actor);

	if (typeof payload !== 'object' || payload === null) {
		return fallback;
	}

	const typedPayload = payload as Partial<ExperienceActorState>;

	return {
		authenticated: typedPayload.authenticated === true,
		sessionResolved: typedPayload.sessionResolved === true,
		skipNextProfileFetch: typedPayload.skipNextProfileFetch === true,
		language: normalizeAppLanguage(
			typeof typedPayload.language === 'string'
				? typedPayload.language
				: fallback.language
		),
		sidebarCollapsed: typedPayload.sidebarCollapsed === true,
		pendingOtp:
			typeof typedPayload.pendingOtp === 'string'
				? typedPayload.pendingOtp
				: null,
		pendingPhoneNumber:
			typeof typedPayload.pendingPhoneNumber === 'string'
				? typedPayload.pendingPhoneNumber
				: '',
		profile: normalizeProfile(actor, typedPayload.profile)
	};
}

function normalizeProfile(
	actor: ExperienceActor,
	payload: unknown
): ExperienceProfile {
	const fallback = defaultProfile(actor);

	if (typeof payload !== 'object' || payload === null) {
		return fallback;
	}

	const typedPayload = payload as Partial<ExperienceProfile> & {
		displayName?: string;
		email?: string;
		phoneNumber?: string;
	};
	const derivedName =
		typeof typedPayload.displayName === 'string' &&
		typedPayload.displayName.trim().length > 0
			? typedPayload.displayName.trim().split(/\s+/)
			: [];

	const names =
		Array.isArray(typedPayload.names) && typedPayload.names.length > 0
			? typedPayload.names.map((name) => ({
					id: typeof name.id === 'string' ? name.id : undefined,
					localeCode:
						typeof name.localeCode === 'string' &&
						name.localeCode.trim().length > 0
							? name.localeCode
							: DEFAULT_APP_LANGUAGE,
					firstName:
						typeof name.firstName === 'string'
							? name.firstName
							: '',
					middleNames:
						typeof name.middleNames === 'string'
							? name.middleNames
							: '',
					lastName:
						typeof name.lastName === 'string' ? name.lastName : '',
					nickname:
						typeof name.nickname === 'string' ? name.nickname : ''
				}))
			: [
					{
						localeCode: DEFAULT_APP_LANGUAGE,
						firstName:
							derivedName[0] ?? fallback.names[0].firstName,
						middleNames:
							derivedName.length > 2
								? derivedName.slice(1, -1).join(' ')
								: '',
						lastName:
							derivedName.length > 1
								? derivedName[derivedName.length - 1]
								: fallback.names[0].lastName,
						nickname: ''
					}
				];
	const contacts =
		Array.isArray(typedPayload.contacts) && typedPayload.contacts.length > 0
			? typedPayload.contacts.map((contact) => ({
					id: typeof contact.id === 'string' ? contact.id : undefined,
					typeName:
						typeof contact.typeName === 'string'
							? contact.typeName
							: 'other',
					typeId:
						typeof contact.typeId === 'string'
							? contact.typeId
							: undefined,
					value:
						typeof contact.value === 'string' ? contact.value : '',
					verified: contact.verified === true,
					isPrimary: contact.isPrimary === true
				}))
			: [
					...(typeof typedPayload.phoneNumber === 'string' &&
					typedPayload.phoneNumber.length > 0
						? [
								{
									typeName: 'mobile',
									value: typedPayload.phoneNumber,
									verified: false,
									isPrimary: true
								}
							]
						: []),
					...(typeof typedPayload.email === 'string' &&
					typedPayload.email.length > 0
						? [
								{
									typeName: 'email',
									value: typedPayload.email,
									verified: false,
									isPrimary:
										typeof typedPayload.phoneNumber !==
											'string' ||
										typedPayload.phoneNumber.length === 0
								}
							]
						: [])
				];
	const locales =
		Array.isArray(typedPayload.locales) && typedPayload.locales.length > 0
			? typedPayload.locales.map((locale) => ({
					id: typeof locale.id === 'string' ? locale.id : undefined,
					localeCode:
						typeof locale.localeCode === 'string'
							? locale.localeCode
							: DEFAULT_APP_LANGUAGE,
					localeId:
						typeof locale.localeId === 'string'
							? locale.localeId
							: DEFAULT_APP_LANGUAGE,
					isPrimary: locale.isPrimary === true
				}))
			: fallback.locales;

	return {
		id: typeof typedPayload.id === 'string' ? typedPayload.id : undefined,
		actorType: actor,
		genderId:
			typeof typedPayload.genderId === 'string'
				? typedPayload.genderId
				: '',
		dateOfBirth:
			typeof typedPayload.dateOfBirth === 'string'
				? typedPayload.dateOfBirth
				: '',
		names,
		contacts,
		locales
	};
}

export function issueOtp(
	state: ExperienceState,
	actor: ExperienceActor,
	phoneNumber: string
): { nextState: ExperienceState; otp: string } {
	const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '').slice(0, 10);
	const otp = createDemoOtp(actor, normalizedPhoneNumber);

	return {
		otp,
		nextState: {
			...state,
			[actor]: {
				// eslint-disable-next-line security/detect-object-injection
				...state[actor],
				pendingOtp: otp,
				pendingPhoneNumber: normalizedPhoneNumber
			}
		}
	};
}

export function completeLogin(
	state: ExperienceState,
	actor: ExperienceActor,
	phoneNumber: string,
	otp: string
): ExperienceState {
	const normalizedPhoneNumber = phoneNumber.replace(/\D/g, '').slice(0, 10);
	// eslint-disable-next-line security/detect-object-injection
	const actorState = state[actor];

	if (
		actorState.pendingOtp !== otp ||
		actorState.pendingPhoneNumber !== normalizedPhoneNumber
	) {
		throw new Error(
			'The one-time password is invalid. Generate a new OTP.'
		);
	}

	return {
		...state,
		[actor]: {
			...actorState,
			authenticated: true,
			pendingOtp: null,
			profile: {
				...actorState.profile,
				contacts: [
					{
						typeName: 'mobile',
						value: normalizedPhoneNumber,
						verified: false,
						isPrimary: true
					},
					...actorState.profile.contacts.filter(
						(contact) => contact.typeName !== 'mobile'
					)
				]
			}
		}
	};
}

export function registerProfile(
	state: ExperienceState,
	actor: ExperienceActor,
	draft: RegistrationDraft
): ExperienceState {
	// eslint-disable-next-line security/detect-object-injection
	const actorState = state[actor];
	const normalizedPhoneNumber = draft.phoneNumber
		.replace(/\D/g, '')
		.slice(0, 10);

	if (
		!actorState.pendingOtp ||
		actorState.pendingOtp !== draft.otp ||
		actorState.pendingPhoneNumber !== normalizedPhoneNumber
	) {
		throw new Error(
			'Validate the one-time password before creating the profile.'
		);
	}

	return {
		...state,
		[actor]: {
			...actorState,
			pendingOtp: null,
			profile: {
				...actorState.profile,
				names: [
					{
						localeCode:
							actorState.profile.locales.find(
								(locale) => locale.isPrimary
							)?.localeCode ?? DEFAULT_APP_LANGUAGE,
						firstName: draft.firstName.trim(),
						middleNames: draft.middleNames.trim(),
						lastName: draft.lastName.trim(),
						nickname: ''
					}
				],
				contacts: [
					{
						typeName: 'mobile',
						value: normalizedPhoneNumber,
						verified: false,
						isPrimary: true
					},
					{
						typeName: 'email',
						value: draft.email.trim(),
						verified: false,
						isPrimary: false
					}
				]
			}
		}
	};
}

export function logoutActor(
	state: ExperienceState,
	actor: ExperienceActor
): ExperienceState {
	// eslint-disable-next-line security/detect-object-injection
	if (!state[actor].authenticated && state[actor].pendingOtp === null) {
		return state;
	}

	return {
		...state,
		[actor]: {
			// eslint-disable-next-line security/detect-object-injection
			...state[actor],
			authenticated: false,
			pendingOtp: null,
			skipNextProfileFetch: false
		}
	};
}

export function updateActorProfile(
	state: ExperienceState,
	actor: ExperienceActor,
	profile: Partial<ExperienceProfile>
): ExperienceState {
	const nextProfile = {
		// eslint-disable-next-line security/detect-object-injection
		...state[actor].profile,
		...profile
	};

	if (
		JSON.stringify(nextProfile) ===
		// eslint-disable-next-line security/detect-object-injection
		JSON.stringify(state[actor].profile)
	) {
		return state;
	}

	return {
		...state,
		[actor]: {
			// eslint-disable-next-line security/detect-object-injection
			...state[actor],
			profile: nextProfile
		}
	};
}

export function setActorAuthenticated(
	state: ExperienceState,
	actor: ExperienceActor,
	authenticated: boolean
): ExperienceState {
	// eslint-disable-next-line security/detect-object-injection
	const nextPendingOtp = authenticated ? null : state[actor].pendingOtp;
	if (
		// eslint-disable-next-line security/detect-object-injection
		state[actor].authenticated === authenticated &&
		// eslint-disable-next-line security/detect-object-injection
		state[actor].sessionResolved === true &&
		// eslint-disable-next-line security/detect-object-injection
		state[actor].pendingOtp === nextPendingOtp
	) {
		return state;
	}

	return {
		...state,
		[actor]: {
			// eslint-disable-next-line security/detect-object-injection
			...state[actor],
			authenticated,
			sessionResolved: true,
			skipNextProfileFetch: authenticated
				? state[actor].skipNextProfileFetch
				: false,
			// eslint-disable-next-line security/detect-object-injection
			pendingOtp: authenticated ? null : state[actor].pendingOtp
		}
	};
}

export function setActorSessionResolved(
	state: ExperienceState,
	actor: ExperienceActor,
	sessionResolved: boolean
): ExperienceState {
	// eslint-disable-next-line security/detect-object-injection
	if (state[actor].sessionResolved === sessionResolved) {
		return state;
	}

	return {
		...state,
		[actor]: {
			// eslint-disable-next-line security/detect-object-injection
			...state[actor],
			sessionResolved
		}
	};
}

export function setActorSkipNextProfileFetch(
	state: ExperienceState,
	actor: ExperienceActor,
	skipNextProfileFetch: boolean
): ExperienceState {
	// eslint-disable-next-line security/detect-object-injection
	if (state[actor].skipNextProfileFetch === skipNextProfileFetch) {
		return state;
	}

	return {
		...state,
		[actor]: {
			// eslint-disable-next-line security/detect-object-injection
			...state[actor],
			skipNextProfileFetch
		}
	};
}

export function updateActorLanguage(
	state: ExperienceState,
	actor: ExperienceActor,
	language: string
): ExperienceState {
	const normalizedLanguage = normalizeAppLanguage(language);
	// eslint-disable-next-line security/detect-object-injection
	if (state[actor].language === normalizedLanguage) {
		return state;
	}

	return {
		...state,
		[actor]: {
			// eslint-disable-next-line security/detect-object-injection
			...state[actor],
			language: normalizedLanguage
		}
	};
}

export function updateActorSidebar(
	state: ExperienceState,
	actor: ExperienceActor,
	sidebarCollapsed: boolean
): ExperienceState {
	// eslint-disable-next-line security/detect-object-injection
	if (state[actor].sidebarCollapsed === sidebarCollapsed) {
		return state;
	}

	return {
		...state,
		[actor]: {
			// eslint-disable-next-line security/detect-object-injection
			...state[actor],
			sidebarCollapsed
		}
	};
}
