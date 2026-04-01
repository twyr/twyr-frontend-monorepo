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

	const syncProfile = async () => {
		const profile = await api.fetchProfile(
			state.profile as PortalProfileInput,
			state.language
		);
		updateProfile(profile);
		return profile;
	};

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
						updateProfile({
							contacts: [
								{
									typeName: 'mobile',
									value: phoneNumber,
									verified: false,
									isPrimary: true
								}
							]
						});
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
						contactTypesEndpoint={buildMobileCorePlatformUrl(
							'/api/v1/masterdata/contact-types',
							state.language
						)}
						onLanguageChange={setLanguage}
						onAddContact={async (contact) => {
							await api.createProfileContact(
								{
									typeId: contact.typeId,
									value: contact.value,
									verified: contact.verified,
									isPrimary: contact.isPrimary
								},
								state.language
							);
							return syncProfile();
						}}
						onMakePrimaryContact={async (contact) => {
							await api.updateProfileContact(
								{
									id: contact.id,
									value: contact.value,
									verified: contact.verified,
									isPrimary: true
								},
								state.language
							);
							return syncProfile();
						}}
						onDeleteContact={async (contactId) => {
							await api.deleteProfileContact(
								contactId,
								state.language
							);
							return syncProfile();
						}}
						onAddLocale={async (locale) => {
							await api.createProfileLocale(
								locale,
								state.language
							);
							return syncProfile();
						}}
						onMakePrimaryLocale={async (locale) => {
							await api.updateProfileLocale(
								locale,
								state.language
							);
							return syncProfile();
						}}
						onDeleteLocale={async (localeId) => {
							await api.deleteProfileLocale(
								localeId,
								state.language
							);
							return syncProfile();
						}}
						onSave={async (profile) => {
							await api.updateProfile(
								profile as PortalProfileInput,
								state.profile as PortalProfileInput,
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
