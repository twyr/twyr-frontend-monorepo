'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	createPortalApiClient,
	type PortalProfileInput,
	withLanguageQuery
} from '@twyr/core';
import { useWebPortalExperience } from '@twyr/app-providers/src/web';
import { UserWebShell } from '@twyr/app-shells/src/web/UserWebShell';
import { ProfileScreen } from '@twyr/users-profile-frontend/src/screens/ProfileScreen';
import { LoginScreen } from '@twyr/users-session-management-frontend/src/screens/LoginScreen';
import { Card } from '@twyr/ui-kit';
import { Text, XStack, YStack } from 'tamagui';

type Props = {
	view: 'dashboard' | 'profile' | 'session-management';
	serverAuthenticated: boolean;
};

export function UsersPortal({ view, serverAuthenticated }: Props) {
	const router = useRouter();
	const experience = useWebPortalExperience('users');
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
				actor: 'users',
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
					updateProfile({ phoneNumber });
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
		<UserWebShell
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
					onLanguageChange={setLanguage}
					onSave={async (profile) => {
						await api.updateProfile(
							profile as PortalProfileInput,
							state.language
						);
						updateProfile(profile);
						await syncProfile();
					}}
				/>
			) : (
				<UsersDashboard view={view} profileError={profileError} />
			)}
		</UserWebShell>
	);
}

function UsersDashboard({
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
						? 'User dashboard'
						: 'Session management'}
				</Text>
				<Text color="$colorHover">
					{view === 'dashboard'
						? 'Authenticated user workspace with the same sidebar and profile structure as the reference app.'
						: 'You are signed in. Continue from the dashboard or update the profile from the authenticated shell.'}
				</Text>
				{profileError ? (
					<Text color="$error">{profileError}</Text>
				) : null}
			</YStack>
			<XStack gap="$4" flexWrap="wrap">
				<Card
					title="Workspace"
					description="Collapsible sidebar, language selector, and profile access are active."
				/>
				<Card
					title="Profile"
					description="Identity and language preferences are editable post-login."
				/>
			</XStack>
		</YStack>
	);
}
