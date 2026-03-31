import { useEffect, useMemo, useState } from 'react';
import { type PortalProfileInput } from '@twyr/core';
import { Text, YStack } from 'tamagui';
import {
	TwyrMobileProviders,
	useMobilePortalExperience
} from '@twyr/app-providers/src/mobile';
import { SystemAdministratorMobileShell } from '@twyr/app-shells/src/mobile/SystemAdministratorMobileShell';
import { ProfileScreen } from '@twyr/system-administrators-profile-frontend/src/screens/ProfileScreen';
import { LoginScreen } from '@twyr/system-administrators-session-management-frontend/src/screens/LoginScreen';
import { Card } from '@twyr/ui-kit';
import {
	buildMobileCorePlatformUrl,
	createMobilePortalApi
} from './runtime-config';

export default function App() {
	return (
		<TwyrMobileProviders
			languageActor="system_administrators"
			languageOptionsEndpoint={buildMobileCorePlatformUrl(
				'/api/v1/masterdata/locales'
			)}
		>
			<SystemAdministratorsMobileApp />
		</TwyrMobileProviders>
	);
}

function SystemAdministratorsMobileApp() {
	const [route, setRoute] = useState<'dashboard' | 'profile'>('dashboard');
	const [profileError, setProfileError] = useState<string | null>(null);
	const experience = useMobilePortalExperience('system_administrators');
	const {
		state,
		languageOptions,
		setAuthenticated,
		setLanguage,
		setSessionResolved,
		updateProfile,
		logout
	} = experience;
	const countryOptionsEndpoint = buildMobileCorePlatformUrl(
		'/api/v1/masterdata/country-codes',
		state.language
	);
	const api = useMemo(
		() => createMobilePortalApi('system_administrators', state.language),
		[state.language]
	);

	const resetToLogin = () => {
		setAuthenticated(false);
		setProfileError(null);
		setRoute('dashboard');
	};

	useEffect(() => {
		if (state.sessionResolved) {
			return;
		}

		let cancelled = false;
		setSessionResolved(false);

		void api
			.validateSession(state.language)
			.then((authenticated) => {
				if (cancelled) {
					return;
				}

				if (!authenticated) {
					resetToLogin();
				} else {
					setAuthenticated(true);
				}
				setSessionResolved(true);
			})
			.catch(() => {
				if (cancelled) {
					return;
				}

				resetToLogin();
				setSessionResolved(true);
			});

		return () => {
			cancelled = true;
		};
	}, [
		api,
		setAuthenticated,
		setSessionResolved,
		state.language,
		state.sessionResolved
	]);

	useEffect(() => {
		if (!state.authenticated) {
			return;
		}

		let cancelled = false;

		void api
			.fetchProfile(state.profile as PortalProfileInput, state.language)
			.then((profile) => {
				if (cancelled) {
					return;
				}

				updateProfile(profile);
				setProfileError(null);
			})
			.catch((error) => {
				if (!cancelled) {
					setProfileError(
						error instanceof Error
							? error.message
							: 'Unable to load the profile.'
					);
				}
			});

		return () => {
			cancelled = true;
		};
	}, [
		api,
		state.authenticated,
		state.language,
		state.profile,
		updateProfile
	]);

	if (!state.authenticated) {
		return (
			<LoginScreen
				selectedLanguage={state.language}
				languageOptions={languageOptions}
				countryOptionsEndpoint={countryOptionsEndpoint}
				requestOtp={(phoneNumber) =>
					api.requestOtp(phoneNumber, state.language)
				}
				validateOtp={(phoneNumber, otp) =>
					api.validateOtp(phoneNumber, otp, state.language)
				}
				login={async (phoneNumber, otp) => {
					try {
						await api.login(phoneNumber, otp, state.language);
						const authenticated = await api.validateSession(
							state.language
						);
						if (!authenticated) {
							resetToLogin();
							throw new Error(
								'Unable to confirm the authenticated session.'
							);
						}
						updateProfile({ phoneNumber });
						setAuthenticated(true);
					} catch (error) {
						resetToLogin();
						throw error;
					}
				}}
				register={(draft) => api.register(draft, state.language)}
				onLanguageChange={setLanguage}
				onLoginSuccess={() => {
					setRoute('dashboard');
				}}
			/>
		);
	}

	return (
		<SystemAdministratorMobileShell
			activeRoute={route}
			onNavigate={setRoute}
			onLogout={async () => {
				await api.logout(state.language);
				logout();
				setRoute('dashboard');
			}}
		>
			<YStack flex={1} padding="$4">
				{route === 'profile' ? (
					<ProfileScreen
						profile={state.profile}
						language={state.language}
						languageOptions={languageOptions}
						onLanguageChange={setLanguage}
						onSave={async (profile) => {
							await api.updateProfile(
								profile as PortalProfileInput,
								state.language
							);
							updateProfile(profile);
						}}
					/>
				) : (
					<Card
						title="Administrator dashboard"
						description="Authenticated administrative mobile workspace with a collapsible menu, profile access, and language controls."
					>
						<Text color="$colorHover">
							Operator language selection is available before
							login and in the authenticated menu.
						</Text>
						{profileError ? (
							<Text color="$error">{profileError}</Text>
						) : null}
					</Card>
				)}
			</YStack>
		</SystemAdministratorMobileShell>
	);
}
