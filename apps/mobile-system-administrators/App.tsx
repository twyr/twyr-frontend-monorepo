import { useEffect, useMemo, useRef, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { normalizeAppLanguage, type PortalProfileInput } from '@twyr/core';
import { useTwyrTranslation } from '@twyr/i18n';
import { Text, YStack } from 'tamagui';
import {
	TwyrMobileProviders,
	useMobilePortalExperience
} from '@twyr/app-providers/src/mobile';
import { useLocalizedPageRequests } from '@twyr/app-providers/src/page-requests';
import { SystemAdministratorMobileShell } from '@twyr/app-shells/src/mobile/SystemAdministratorMobileShell';
import { ProfileScreen } from '@twyr/system-administrators-profile-frontend/src/screens/ProfileScreen';
import { LoginScreen } from '@twyr/system-administrators-session-management-frontend/src/screens/LoginScreen';
import { Card } from '@twyr/ui-kit';
import {
	buildMobileCorePlatformUrl,
	createMobilePortalApi
} from './runtime-config';
import AUTH_LOGO from './assets/auth/public-page-logo.png';
import PUBLIC_PAGE_BACKGROUND from './assets/auth/public-page-background.png';

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
	const { t } = useTwyrTranslation();
	const [route, setRoute] = useState<'dashboard' | 'profile'>('dashboard');
	const [profileError, setProfileError] = useState<string | null>(null);
	const logoutInProgressRef = useRef(false);
	const experience = useMobilePortalExperience('system_administrators');
	const {
		state,
		languageOptions,
		setAuthenticated,
		setLanguage,
		setSessionResolved,
		setSkipNextProfileFetch,
		updateProfile,
		logout
	} = experience;
	const { runRequest, unregisterRequest } = useLocalizedPageRequests(
		state.language
	);
	const countryOptionsEndpoint = buildMobileCorePlatformUrl(
		'/api/v1/masterdata/country-codes',
		state.language
	);
	const api = useMemo(
		() => createMobilePortalApi('system_administrators', state.language),
		[state.language]
	);

	const applyProfile = (
		profile: PortalProfileInput,
		syncPrimaryLocale = false
	) => {
		updateProfile(profile);

		if (!syncPrimaryLocale) {
			return;
		}

		const primaryLocale =
			profile.locales.find((locale) => locale.isPrimary)?.localeCode ??
			profile.locales.find((locale) => locale.isPrimary)?.localeId;

		if (primaryLocale && primaryLocale !== state.language) {
			setLanguage(normalizeAppLanguage(primaryLocale));
		}
	};

	const syncProfile = async (syncPrimaryLocale = false) => {
		const profile = await api.fetchProfile(
			state.profile as PortalProfileInput,
			state.language
		);
		applyProfile(profile, syncPrimaryLocale);
		return profile;
	};

	const resetToLogin = () => {
		setAuthenticated(false);
		setProfileError(null);
		setRoute('dashboard');
	};

	useEffect(() => {
		if (state.sessionResolved) {
			unregisterRequest('session');
			return;
		}

		let cancelled = false;
		setSessionResolved(false);

		void runRequest('session', async (locale) => {
			try {
				const authenticated = await api.validateSession(locale);
				if (cancelled) {
					return;
				}

				if (!authenticated) {
					resetToLogin();
				} else {
					setAuthenticated(true);
				}
				setSessionResolved(true);
			} catch {
				if (cancelled) {
					return;
				}

				resetToLogin();
				setSessionResolved(true);
			}
		});

		return () => {
			cancelled = true;
			unregisterRequest('session');
		};
	}, [
		api,
		runRequest,
		setAuthenticated,
		setSessionResolved,
		state.sessionResolved,
		unregisterRequest
	]);

	useEffect(() => {
		if (
			logoutInProgressRef.current ||
			!state.authenticated ||
			route !== 'profile'
		) {
			unregisterRequest('profile');
			return;
		}

		if (state.skipNextProfileFetch) {
			setSkipNextProfileFetch(false);
			unregisterRequest('profile');
			return;
		}

		let cancelled = false;

		void runRequest('profile', async (locale) => {
			try {
				const profile = await api.fetchProfile(
					state.profile as PortalProfileInput,
					locale
				);
				if (cancelled) {
					return;
				}

				applyProfile(profile);
				setProfileError(null);
			} catch (error) {
				if (!cancelled) {
					setProfileError(
						error instanceof Error
							? error.message
							: t('common.messages.profileLoadedFailed')
					);
				}
			}
		});

		return () => {
			cancelled = true;
			unregisterRequest('profile');
		};
	}, [
		api,
		runRequest,
		route,
		state.authenticated,
		state.skipNextProfileFetch,
		setSkipNextProfileFetch,
		setLanguage,
		t,
		unregisterRequest,
		updateProfile
	]);

	if (!state.authenticated) {
		return (
			<ImageBackground
				source={PUBLIC_PAGE_BACKGROUND}
				style={styles.publicPageBackground}
				imageStyle={styles.publicPageBackgroundImage}
			>
				<View style={styles.publicPageOverlay}>
					<View style={styles.publicPagePanel}>
						<LoginScreen
							selectedLanguage={state.language}
							languageOptions={languageOptions}
							countryOptionsEndpoint={countryOptionsEndpoint}
							requestOtp={(phoneNumber) =>
								api.requestOtp(phoneNumber, state.language)
							}
							login={async (phoneNumber, otp) => {
								try {
									const loginResult = await api.login(
										phoneNumber,
										otp,
										state.language
									);
									logoutInProgressRef.current = false;
									const loginLocale =
										loginResult.primaryLocale ??
										state.language;
									setSkipNextProfileFetch(true);
									setAuthenticated(true);
									if (loginResult.primaryLocale) {
										setLanguage(loginResult.primaryLocale);
									}
									const authenticated =
										await api.validateSession(loginLocale);
									if (!authenticated) {
										resetToLogin();
										throw new Error(
											t(
												'common.messages.sessionConfirmationFailed'
											)
										);
									}
								} catch (error) {
									resetToLogin();
									throw error;
								}
							}}
							headerLogo={
								<Image
									source={AUTH_LOGO}
									style={styles.authLogo}
								/>
							}
							onLanguageChange={setLanguage}
							onLoginSuccess={() => {
								setRoute('dashboard');
							}}
						/>
					</View>
				</View>
			</ImageBackground>
		);
	}

	return (
		<SystemAdministratorMobileShell
			activeRoute={route}
			headerBrand={<Image source={AUTH_LOGO} style={styles.authLogo} />}
			onNavigate={setRoute}
			onLogout={async () => {
				logoutInProgressRef.current = true;
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
						gendersEndpoint={buildMobileCorePlatformUrl(
							'/api/v1/masterdata/genders',
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
							return syncProfile(true);
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
						title={t('adminDashboard.title')}
						description={t('adminDashboard.mobileDescription')}
					>
						<Text color="$colorHover">
							{t('adminDashboard.mobileLanguageDescription')}
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

const styles = StyleSheet.create({
	publicPageBackground: {
		flex: 1
	},
	publicPageBackgroundImage: {
		resizeMode: 'cover'
	},
	publicPageOverlay: {
		alignItems: 'center',
		backgroundColor: 'rgba(2, 6, 23, 0.4)',
		flex: 1,
		justifyContent: 'center',
		padding: 16
	},
	publicPagePanel: {
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
		borderColor: 'rgba(255, 255, 255, 0.22)',
		borderRadius: 28,
		borderWidth: 1,
		maxWidth: 480,
		overflow: 'hidden',
		shadowColor: '#0f172a',
		shadowOffset: { width: 0, height: 16 },
		shadowOpacity: 0.28,
		shadowRadius: 24,
		width: '100%'
	},
	authLogo: {
		height: 36,
		resizeMode: 'contain'
	}
});
