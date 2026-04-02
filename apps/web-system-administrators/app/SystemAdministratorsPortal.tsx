'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	createPortalApiClient,
	normalizeAppLanguage,
	type PortalProfileInput,
	withLanguageQuery
} from '@twyr/core';
import { useLocalizedPageRequests } from '@twyr/app-providers/src/page-requests';
import { useWebPortalExperience } from '@twyr/app-providers/src/web';
import { useTwyrTranslation } from '@twyr/i18n';
import { SystemAdministratorWebShell } from '@twyr/app-shells/src/web/SystemAdministratorWebShell';
import { ProfileScreen } from '@twyr/system-administrators-profile-frontend/src/screens/ProfileScreen';
import { LoginScreen } from '@twyr/system-administrators-session-management-frontend/src/screens/LoginScreen';
import { Card } from '@twyr/ui-kit';
import { Text, XStack, YStack } from 'tamagui';

type Props = {
	view: 'dashboard' | 'profile' | 'session-management';
	serverAuthenticated: boolean;
};

export function SystemAdministratorsPortal({
	view,
	serverAuthenticated
}: Props) {
	const { t } = useTwyrTranslation();
	const router = useRouter();
	const experience = useWebPortalExperience('system_administrators');
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
	const [profileError, setProfileError] = useState<string | null>(null);
	const [hasHydrated, setHasHydrated] = useState(false);
	const logoutInProgressRef = useRef(false);
	const countryOptionsEndpoint = withLanguageQuery(
		'/api/v1/masterdata/country-codes',
		state.language
	);
	const api = useMemo(
		() =>
			createPortalApiClient({
				actor: 'system_administrators',
				buildUrl: (path, locale) =>
					withLanguageQuery(path, locale ?? state.language)
			}),
		[state.language]
	);

	useEffect(() => {
		setHasHydrated(true);
	}, []);

	useEffect(() => {
		setAuthenticated(serverAuthenticated);
		setSessionResolved(true);
	}, [serverAuthenticated, setAuthenticated, setSessionResolved]);

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

	useEffect(() => {
		if (
			logoutInProgressRef.current ||
			!state.authenticated ||
			view !== 'profile'
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
		state.authenticated,
		state.skipNextProfileFetch,
		view,
		setSkipNextProfileFetch,
		setLanguage,
		t,
		unregisterRequest,
		updateProfile
	]);

	if (!serverAuthenticated && !state.authenticated) {
		return (
			<div className="system-admin-public-page">
				<div className="system-admin-public-page__panel">
					{hasHydrated ? (
						<LoginScreen
							selectedLanguage={state.language}
							languageOptions={languageOptions}
							countryOptionsEndpoint={countryOptionsEndpoint}
							requestOtp={(phoneNumber) =>
								api.requestOtp(phoneNumber, state.language)
							}
							login={async (phoneNumber, otp) => {
								const loginResult = await api.login(
									phoneNumber,
									otp,
									state.language
								);
								logoutInProgressRef.current = false;
								setSkipNextProfileFetch(true);
								setAuthenticated(true);
								if (loginResult.primaryLocale) {
									setLanguage(loginResult.primaryLocale);
								}
							}}
							headerLogo={
								<img
									alt={t('common.appName')}
									src="/auth/public-page-logo.png"
									style={{
										height: 36,
										objectFit: 'contain'
									}}
								/>
							}
							onLanguageChange={setLanguage}
							onLoginSuccess={() => {
								router.push('/');
							}}
						/>
					) : null}
				</div>
			</div>
		);
	}

	return (
		<SystemAdministratorWebShell
			headerBrand={
				<img
					alt={t('common.appName')}
					src="/auth/public-page-logo.png"
					style={{
						height: 36,
						objectFit: 'contain'
					}}
				/>
			}
			onLogout={async () => {
				logoutInProgressRef.current = true;
				await api.logout(state.language);
				logout();
				router.push('/session-management');
			}}
		>
			{view === 'profile' ? (
				<ProfileScreen
					profile={state.profile}
					language={state.language}
					languageOptions={languageOptions}
					contactTypesEndpoint="/api/v1/masterdata/contact-types"
					gendersEndpoint="/api/v1/masterdata/genders"
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
						await syncProfile();
						return api.fetchProfile(
							state.profile as PortalProfileInput,
							state.language
						);
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
						await syncProfile();
						return api.fetchProfile(
							state.profile as PortalProfileInput,
							state.language
						);
					}}
					onDeleteContact={async (contactId) => {
						await api.deleteProfileContact(
							contactId,
							state.language
						);
						await syncProfile();
						return api.fetchProfile(
							state.profile as PortalProfileInput,
							state.language
						);
					}}
					onAddLocale={async (locale) => {
						await api.createProfileLocale(locale, state.language);
						await syncProfile();
						return api.fetchProfile(
							state.profile as PortalProfileInput,
							state.language
						);
					}}
					onMakePrimaryLocale={async (locale) => {
						await api.updateProfileLocale(locale, state.language);
						await syncProfile(true);
						return api.fetchProfile(
							state.profile as PortalProfileInput,
							state.language
						);
					}}
					onDeleteLocale={async (localeId) => {
						await api.deleteProfileLocale(localeId, state.language);
						await syncProfile();
						return api.fetchProfile(
							state.profile as PortalProfileInput,
							state.language
						);
					}}
					onSave={async (profile) => {
						await api.updateProfile(
							profile as PortalProfileInput,
							state.profile as PortalProfileInput,
							state.language
						);
						updateProfile(profile);
						await syncProfile();
					}}
				/>
			) : (
				<SystemAdministratorsDashboard
					view={view}
					profileError={profileError}
				/>
			)}
		</SystemAdministratorWebShell>
	);
}

function SystemAdministratorsDashboard({
	view,
	profileError
}: {
	view: 'dashboard' | 'session-management';
	profileError: string | null;
}) {
	const { t } = useTwyrTranslation();
	return (
		<YStack gap="$5">
			<YStack gap="$2">
				<Text fontSize="$10" fontWeight="700" color="$color">
					{view === 'dashboard'
						? t('adminDashboard.title')
						: t('adminDashboard.sessionManagement')}
				</Text>
				<Text color="$colorHover">
					{view === 'dashboard'
						? t('adminDashboard.dashboardDescription')
						: t('adminDashboard.sessionDescription')}
				</Text>
				{profileError ? (
					<Text color="$error">{profileError}</Text>
				) : null}
			</YStack>
			<XStack gap="$4" flexWrap="wrap">
				<Card
					title={t('common.labels.workspace')}
					description={t('adminDashboard.workspaceDescription')}
				/>
				<Card
					title={t('common.actions.profile')}
					description={t('adminDashboard.profileDescription')}
				/>
			</XStack>
		</YStack>
	);
}
