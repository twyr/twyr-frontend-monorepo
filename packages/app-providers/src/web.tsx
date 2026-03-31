'use client';

import {
	createContext,
	type PropsWithChildren,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
} from 'react';
import { ToastProvider } from '@tamagui/toast';
import { TamaguiProvider, Theme } from 'tamagui';
import {
	fetchLocaleOptions,
	normalizeAppLanguage,
	type AppLanguageCode
} from '@twyr/core';
import { tamaguiConfig } from '@twyr/design-system';
import { type ThemeMode } from '@twyr/ui-kit';
import {
	completeLogin,
	createDefaultExperienceState,
	experienceLanguageOptions,
	issueOtp,
	logoutActor,
	registerProfile,
	type ExperienceActor,
	type ExperienceLanguageOption,
	type ExperienceProfile,
	type RegistrationDraft,
	updateActorLanguage,
	updateActorProfile,
	updateActorSidebar,
	setActorAuthenticated,
	setActorSessionResolved,
	normalizeExperienceLanguageOptions,
	normalizeExperienceState,
	resetStoredSessionResolution
} from './experience-state';

const THEME_STORAGE_KEY = 'twyr:web-theme-mode';
const EXPERIENCE_STORAGE_KEY = 'twyr:web-portal-experience:v1';

type ResolvedTheme = 'light' | 'dark';

type WebThemeContextValue = {
	themeMode: ThemeMode;
	setThemeMode: (mode: ThemeMode) => void;
	resolvedTheme: ResolvedTheme;
};

const WebThemeContext = createContext<WebThemeContextValue | null>(null);
type WebPortalContextValue = {
	state: ReturnType<typeof createDefaultExperienceState>;
	languageOptions: ExperienceLanguageOption[];
	requestOtp: (
		actor: ExperienceActor,
		phoneNumber: string
	) => Promise<string>;
	login: (actor: ExperienceActor, phoneNumber: string, otp: string) => void;
	register: (actor: ExperienceActor, draft: RegistrationDraft) => void;
	logout: (actor: ExperienceActor) => void;
	setLanguage: (actor: ExperienceActor, language: AppLanguageCode) => void;
	setSidebarCollapsed: (
		actor: ExperienceActor,
		sidebarCollapsed: boolean
	) => void;
	updateProfile: (
		actor: ExperienceActor,
		profile: Partial<ExperienceProfile>
	) => void;
	setAuthenticated: (actor: ExperienceActor, authenticated: boolean) => void;
	setSessionResolved: (
		actor: ExperienceActor,
		sessionResolved: boolean
	) => void;
};

const WebPortalContext = createContext<WebPortalContextValue | null>(null);

function readStoredThemeMode(): ThemeMode {
	if (typeof window === 'undefined') {
		return 'system';
	}

	const storedThemeMode = window.localStorage.getItem(THEME_STORAGE_KEY);

	if (
		storedThemeMode === 'light' ||
		storedThemeMode === 'dark' ||
		storedThemeMode === 'system'
	) {
		return storedThemeMode;
	}

	return 'system';
}

export function useWebThemeMode() {
	const value = useContext(WebThemeContext);

	if (!value) {
		throw new Error('useWebThemeMode must be used within TwyrWebProviders');
	}

	return value;
}

export function useWebPortalExperience(actor: ExperienceActor) {
	const value = useContext(WebPortalContext);

	if (!value) {
		throw new Error(
			'useWebPortalExperience must be used within TwyrWebProviders'
		);
	}

	return useMemo(
		() => ({
			actor,
			// eslint-disable-next-line security/detect-object-injection
			state: value.state[actor],
			languageOptions: value.languageOptions,
			requestOtp: async (phoneNumber: string) =>
				value.requestOtp(actor, phoneNumber),
			login: (phoneNumber: string, otp: string) =>
				value.login(actor, phoneNumber, otp),
			register: (draft: RegistrationDraft) =>
				value.register(actor, draft),
			logout: () => value.logout(actor),
			setLanguage: (language: AppLanguageCode) =>
				value.setLanguage(actor, language),
			setSidebarCollapsed: (sidebarCollapsed: boolean) =>
				value.setSidebarCollapsed(actor, sidebarCollapsed),
			updateProfile: (profile: Partial<ExperienceProfile>) =>
				value.updateProfile(actor, profile),
			setAuthenticated: (authenticated: boolean) =>
				value.setAuthenticated(actor, authenticated),
			setSessionResolved: (sessionResolved: boolean) =>
				value.setSessionResolved(actor, sessionResolved)
		}),
		[actor, value]
	);
}

type TwyrWebProvidersProps = PropsWithChildren<{
	languageOptionsEndpoint?: string;
	languageActor?: ExperienceActor;
}>;

export function TwyrWebProviders({
	children,
	languageOptionsEndpoint,
	languageActor = 'users'
}: TwyrWebProvidersProps) {
	const [themeMode, setThemeMode] = useState<ThemeMode>('system');
	const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');
	const [experienceState, setExperienceState] = useState(
		createDefaultExperienceState
	);
	const [languageOptions, setLanguageOptions] = useState<
		ExperienceLanguageOption[]
	>(experienceLanguageOptions);
	const resolvedTheme = useMemo<ResolvedTheme>(() => {
		if (themeMode === 'light') return 'light';
		if (themeMode === 'dark') return 'dark';

		return systemTheme;
	}, [systemTheme, themeMode]);

	useEffect(() => {
		setThemeMode(readStoredThemeMode());
		if (typeof window !== 'undefined') {
			const storedExperienceState = window.localStorage.getItem(
				EXPERIENCE_STORAGE_KEY
			);
			if (storedExperienceState) {
				try {
					setExperienceState(
						resetStoredSessionResolution(
							normalizeExperienceState(
								JSON.parse(storedExperienceState)
							)
						)
					);
				} catch {
					setExperienceState(createDefaultExperienceState());
				}
			}
		}

		if (typeof window === 'undefined') {
			return;
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handleSystemThemeChange = () => {
			setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
		};

		handleSystemThemeChange();

		mediaQuery.addEventListener('change', handleSystemThemeChange);

		return () => {
			mediaQuery.removeEventListener('change', handleSystemThemeChange);
		};
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
		document.documentElement.style.colorScheme = resolvedTheme;
	}, [resolvedTheme, themeMode]);

	useEffect(() => {
		if (typeof window === 'undefined') {
			return;
		}

		window.localStorage.setItem(
			EXPERIENCE_STORAGE_KEY,
			JSON.stringify(experienceState)
		);
	}, [experienceState]);

	useEffect(() => {
		if (!languageOptionsEndpoint) {
			return;
		}

		let cancelled = false;
		const locale = normalizeAppLanguage(
			// eslint-disable-next-line security/detect-object-injection
			experienceState[languageActor].language
		);

		void fetchLocaleOptions(languageOptionsEndpoint, locale).then(
			(options) => {
				if (cancelled) {
					return;
				}

				setLanguageOptions(
					normalizeExperienceLanguageOptions(
						options.map((option) => ({
							code: normalizeAppLanguage(option.code),
							label: option.language_name
						}))
					)
				);
			}
		);

		return () => {
			cancelled = true;
		};
	}, [
		// eslint-disable-next-line security/detect-object-injection
		experienceState[languageActor].language,
		languageActor,
		languageOptionsEndpoint
	]);

	const requestOtp = useCallback(
		async (actor: ExperienceActor, phoneNumber: string) => {
			let nextOtp = '';
			setExperienceState((currentState) => {
				const result = issueOtp(currentState, actor, phoneNumber);
				nextOtp = result.otp;
				return result.nextState;
			});

			return nextOtp;
		},
		[]
	);

	const login = useCallback(
		(actor: ExperienceActor, phoneNumber: string, otp: string) => {
			setExperienceState((currentState) =>
				completeLogin(currentState, actor, phoneNumber, otp)
			);
		},
		[]
	);

	const register = useCallback(
		(actor: ExperienceActor, draft: RegistrationDraft) => {
			setExperienceState((currentState) =>
				registerProfile(currentState, actor, draft)
			);
		},
		[]
	);

	const logout = useCallback((actor: ExperienceActor) => {
		setExperienceState((currentState) => logoutActor(currentState, actor));
	}, []);

	const setLanguage = useCallback(
		(actor: ExperienceActor, language: AppLanguageCode) => {
			setExperienceState((currentState) =>
				updateActorLanguage(currentState, actor, language)
			);
		},
		[]
	);

	const setSidebarCollapsed = useCallback(
		(actor: ExperienceActor, sidebarCollapsed: boolean) => {
			setExperienceState((currentState) =>
				updateActorSidebar(currentState, actor, sidebarCollapsed)
			);
		},
		[]
	);

	const updateProfile = useCallback(
		(actor: ExperienceActor, profile: Partial<ExperienceProfile>) => {
			setExperienceState((currentState) =>
				updateActorProfile(currentState, actor, profile)
			);
		},
		[]
	);

	const setAuthenticated = useCallback(
		(actor: ExperienceActor, authenticated: boolean) => {
			setExperienceState((currentState) =>
				setActorAuthenticated(currentState, actor, authenticated)
			);
		},
		[]
	);

	const setSessionResolved = useCallback(
		(actor: ExperienceActor, sessionResolved: boolean) => {
			setExperienceState((currentState) =>
				setActorSessionResolved(currentState, actor, sessionResolved)
			);
		},
		[]
	);

	const portalContextValue = useMemo<WebPortalContextValue>(
		() => ({
			state: experienceState,
			languageOptions,
			requestOtp,
			login,
			register,
			logout,
			setLanguage,
			setSidebarCollapsed,
			updateProfile,
			setAuthenticated,
			setSessionResolved
		}),
		[
			experienceState,
			languageOptions,
			login,
			logout,
			register,
			requestOtp,
			setAuthenticated,
			setLanguage,
			setSessionResolved,
			setSidebarCollapsed,
			updateProfile
		]
	);

	return (
		<WebThemeContext.Provider
			value={{ themeMode, setThemeMode, resolvedTheme }}
		>
			<WebPortalContext.Provider value={portalContextValue}>
				<TamaguiProvider
					config={tamaguiConfig}
					defaultTheme={resolvedTheme}
				>
					<Theme name={resolvedTheme}>
						<ToastProvider>{children}</ToastProvider>
					</Theme>
				</TamaguiProvider>
			</WebPortalContext.Provider>
		</WebThemeContext.Provider>
	);
}
