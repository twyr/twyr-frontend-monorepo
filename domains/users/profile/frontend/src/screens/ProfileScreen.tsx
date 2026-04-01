import { useEffect, useState } from 'react';
import type { AppLanguageCode, PortalProfileInput } from '@twyr/core';
import { ProfileEditor } from '@twyr/ui-composed';

type LanguageOption = {
	code: string;
	label: string;
};

type Props = {
	profile: PortalProfileInput;
	language: AppLanguageCode;
	languageOptions: LanguageOption[];
	contactTypesEndpoint: string;
	onLanguageChange: (language: AppLanguageCode) => void;
	onSave: (profile: PortalProfileInput) => Promise<void>;
	onAddContact: (contact: {
		typeId: string;
		typeName: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}) => Promise<PortalProfileInput | void>;
	onMakePrimaryContact: (contact: {
		id: string;
		typeName: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}) => Promise<PortalProfileInput | void>;
	onDeleteContact: (contactId: string) => Promise<PortalProfileInput | void>;
	onAddLocale: (locale: {
		localeId: string;
		isPrimary: boolean;
	}) => Promise<PortalProfileInput | void>;
	onMakePrimaryLocale: (locale: {
		id: string;
		localeId: string;
		isPrimary: boolean;
	}) => Promise<PortalProfileInput | void>;
	onDeleteLocale: (localeId: string) => Promise<PortalProfileInput | void>;
};

export function ProfileScreen({
	profile,
	language,
	languageOptions,
	contactTypesEndpoint,
	onSave,
	onAddContact,
	onMakePrimaryContact,
	onDeleteContact,
	onAddLocale,
	onMakePrimaryLocale,
	onDeleteLocale
}: Props) {
	const [localizedProfile, setLocalizedProfile] = useState(profile);

	useEffect(() => {
		setLocalizedProfile(profile);
	}, [profile]);

	return (
		<ProfileEditor
			title="User profile"
			description="Manage the authenticated profile with locale-aware names, contacts, and preferred locales."
			nameCardTitle="Names"
			nameCardDescription="Edit the active locale's first name, middle names, last name, and nickname."
			contactCardTitle="Contacts"
			contactCardDescription="Review contacts, delete non-primary entries, and choose the primary contact."
			localeCardTitle="Locales"
			localeCardDescription="Choose one or more locales for the user profile."
			language={language}
			contactTypesEndpoint={contactTypesEndpoint}
			profile={localizedProfile}
			languageOptions={languageOptions}
			onSave={async (nextProfile) => {
				await onSave(nextProfile);
				setLocalizedProfile(nextProfile);
			}}
			onAddContact={async (contact) => {
				const nextProfile = await onAddContact(contact);
				if (nextProfile) {
					setLocalizedProfile(nextProfile);
				}

				return nextProfile;
			}}
			onMakePrimaryContact={async (contact) => {
				const nextProfile = await onMakePrimaryContact(contact);
				if (nextProfile) {
					setLocalizedProfile(nextProfile);
				}

				return nextProfile;
			}}
			onDeleteContact={async (contactId) => {
				const nextProfile = await onDeleteContact(contactId);
				if (nextProfile) {
					setLocalizedProfile(nextProfile);
				}

				return nextProfile;
			}}
			onAddLocale={async (locale) => {
				const nextProfile = await onAddLocale(locale);
				if (nextProfile) {
					setLocalizedProfile(nextProfile);
				}

				return nextProfile;
			}}
			onMakePrimaryLocale={async (locale) => {
				const nextProfile = await onMakePrimaryLocale(locale);
				if (nextProfile) {
					setLocalizedProfile(nextProfile);
				}

				return nextProfile;
			}}
			onDeleteLocale={async (localeId) => {
				const nextProfile = await onDeleteLocale(localeId);
				if (nextProfile) {
					setLocalizedProfile(nextProfile);
				}

				return nextProfile;
			}}
		/>
	);
}
