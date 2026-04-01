'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	createPortalApiClient,
	type PortalProfileInput,
	withLanguageQuery
} from '@twyr/core';
import { useWebPortalExperience } from '@twyr/app-providers/src/web';
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
	const router = useRouter();
	const experience = useWebPortalExperience('system_administrators');
	const {
		state,
		languageOptions,
		setAuthenticated,
		setLanguage,
		setSessionResolved,
		updateProfile,
		logout
	} = experience;
	const [profileError, setProfileError] = useState<string | null>(null);
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
		setAuthenticated(serverAuthenticated);
		setSessionResolved(true);
	}, [serverAuthenticated, setAuthenticated, setSessionResolved]);

	const syncProfile = async () => {
		const profile = await api.fetchProfile(
			state.profile as PortalProfileInput,
			state.language
		);

		updateProfile(profile);
	};

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

	if (!serverAuthenticated) {
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
					await api.login(phoneNumber, otp, state.language);
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
				}}
				register={(draft) => api.register(draft, state.language)}
				onLanguageChange={setLanguage}
				onLoginSuccess={() => {
					router.push('/');
				}}
			/>
		);
	}

	return (
		<SystemAdministratorWebShell
			onLogout={async () => {
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
						await syncProfile();
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
	return (
		<YStack gap="$5">
			<YStack gap="$2">
				<Text fontSize="$10" fontWeight="700" color="$color">
					{view === 'dashboard'
						? 'Administrator dashboard'
						: 'Session management'}
				</Text>
				<Text color="$colorHover">
					{view === 'dashboard'
						? 'Privileged operators land in the same authenticated layout, with collapsible navigation and profile access.'
						: 'The administrator session is active. Use the sidebar to move between dashboard and profile.'}
				</Text>
				{profileError ? (
					<Text color="$error">{profileError}</Text>
				) : null}
			</YStack>
			<XStack gap="$4" flexWrap="wrap">
				<Card
					title="Workspace"
					description="Administrative shell chrome is active with language selection and logout."
				/>
				<Card
					title="Profile"
					description="Operator identity and privilege scope remain editable post-login."
				/>
			</XStack>
		</YStack>
	);
}
