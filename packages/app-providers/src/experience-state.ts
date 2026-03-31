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
	displayName: string;
	email: string;
	phoneNumber: string;
	organization: string;
	roleTitle: string;
};

export type ExperienceActorState = {
	authenticated: boolean;
	sessionResolved: boolean;
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
	if (actor === 'system_administrators') {
		return {
			displayName: 'System Administrator',
			email: 'administrator@twyr.in',
			phoneNumber: '',
			organization: 'Twyr Operations',
			roleTitle: 'Platform Administrator'
		};
	}

	return {
		displayName: 'Twyr User',
		email: 'user@twyr.in',
		phoneNumber: '',
		organization: 'Twyr',
		roleTitle: 'Platform User'
	};
}

function defaultActorState(actor: ExperienceActor): ExperienceActorState {
	return {
		authenticated: false,
		sessionResolved: false,
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
					sessionResolved: false
				}
			: state.users,
		system_administrators: state.system_administrators.authenticated
			? {
					...state.system_administrators,
					sessionResolved: false
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

	const typedPayload = payload as Partial<ExperienceProfile>;

	return {
		displayName:
			typeof typedPayload.displayName === 'string' &&
			typedPayload.displayName.trim().length > 0
				? typedPayload.displayName
				: fallback.displayName,
		email:
			typeof typedPayload.email === 'string'
				? typedPayload.email
				: fallback.email,
		phoneNumber:
			typeof typedPayload.phoneNumber === 'string'
				? typedPayload.phoneNumber
				: fallback.phoneNumber,
		organization:
			typeof typedPayload.organization === 'string'
				? typedPayload.organization
				: fallback.organization,
		roleTitle:
			typeof typedPayload.roleTitle === 'string'
				? typedPayload.roleTitle
				: fallback.roleTitle
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
				phoneNumber: normalizedPhoneNumber
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

	const displayName = [
		draft.firstName.trim(),
		draft.middleNames.trim(),
		draft.lastName.trim()
	]
		.filter(Boolean)
		.join(' ');

	return {
		...state,
		[actor]: {
			...actorState,
			pendingOtp: null,
			profile: {
				displayName: displayName || actorState.profile.displayName,
				email: draft.email.trim(),
				phoneNumber: normalizedPhoneNumber,
				organization: draft.organization.trim(),
				roleTitle: draft.roleTitle.trim()
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
			pendingOtp: null
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
		// eslint-disable-next-line security/detect-object-injection
		nextProfile.displayName === state[actor].profile.displayName &&
		// eslint-disable-next-line security/detect-object-injection
		nextProfile.email === state[actor].profile.email &&
		// eslint-disable-next-line security/detect-object-injection
		nextProfile.phoneNumber === state[actor].profile.phoneNumber &&
		// eslint-disable-next-line security/detect-object-injection
		nextProfile.organization === state[actor].profile.organization &&
		// eslint-disable-next-line security/detect-object-injection
		nextProfile.roleTitle === state[actor].profile.roleTitle
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
