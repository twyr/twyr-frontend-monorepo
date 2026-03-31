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
import { useColorScheme } from 'react-native';
import { ToastProvider } from '@tamagui/toast';
import { TamaguiProvider, Theme, YStack } from 'tamagui';
import {
	fetchLocaleOptions,
	normalizeAppLanguage,
	type AppLanguageCode
} from '@twyr/core';
import { tamaguiConfig } from '@twyr/design-system';
import { type MobileThemeMode } from '@twyr/ui-kit';
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
	normalizeExperienceLanguageOptions
} from './experience-state';

type MobileThemeContextValue = {
	themeMode: MobileThemeMode;
	setThemeMode: (mode: MobileThemeMode) => void;
	resolvedTheme: 'light' | 'dark';
};

const MobileThemeContext = createContext<MobileThemeContextValue | null>(null);
type MobilePortalContextValue = {
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

const MobilePortalContext = createContext<MobilePortalContextValue | null>(
	null
);

export function useMobileThemeMode() {
	const value = useContext(MobileThemeContext);

	if (!value) {
		throw new Error(
			'useMobileThemeMode must be used within TwyrMobileProviders'
		);
	}

	return value;
}

export function useMobilePortalExperience(actor: ExperienceActor) {
	const value = useContext(MobilePortalContext);

	if (!value) {
		throw new Error(
			'useMobilePortalExperience must be used within TwyrMobileProviders'
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

type TwyrMobileProvidersProps = PropsWithChildren<{
	languageOptionsEndpoint?: string;
	languageActor?: ExperienceActor;
}>;

export function TwyrMobileProviders({
	children,
	languageOptionsEndpoint,
	languageActor = 'users'
}: TwyrMobileProvidersProps) {
	const systemScheme = useColorScheme();
	const [themeMode, setThemeMode] = useState<MobileThemeMode>('system');
	const [experienceState, setExperienceState] = useState(
		createDefaultExperienceState
	);
	const [languageOptions, setLanguageOptions] = useState<
		ExperienceLanguageOption[]
	>(experienceLanguageOptions);
	const resolvedTheme = useMemo(() => {
		if (themeMode === 'light') return 'light';
		if (themeMode === 'dark') return 'dark';

		return systemScheme === 'dark' ? 'dark' : 'light';
	}, [systemScheme, themeMode]);

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

	return (
		<MobileThemeContext.Provider
			value={{ themeMode, setThemeMode, resolvedTheme }}
		>
			<MobilePortalContext.Provider
				value={{
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
				}}
			>
				<TamaguiProvider
					key={resolvedTheme}
					config={tamaguiConfig}
					defaultTheme={resolvedTheme}
				>
					<Theme key={resolvedTheme} name={resolvedTheme}>
						<ToastProvider>
							<YStack flex={1}>{children}</YStack>
						</ToastProvider>
					</Theme>
				</TamaguiProvider>
			</MobilePortalContext.Provider>
		</MobileThemeContext.Provider>
	);
}
