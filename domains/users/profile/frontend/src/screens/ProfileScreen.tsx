import { useEffect, useState } from 'react';
import type { AppLanguageCode, PortalProfileInput } from '@twyr/core';
import { useTwyrTranslation } from '@twyr/i18n';
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
	gendersEndpoint: string;
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
	gendersEndpoint,
	onSave,
	onAddContact,
	onMakePrimaryContact,
	onDeleteContact,
	onAddLocale,
	onMakePrimaryLocale,
	onDeleteLocale
}: Props) {
	const { t } = useTwyrTranslation();
	const [localizedProfile, setLocalizedProfile] = useState(profile);

	useEffect(() => {
		setLocalizedProfile(profile);
	}, [profile]);

	return (
		<ProfileEditor
			title={t('userProfile.title')}
			description={t('userProfile.description')}
			nameCardTitle={t('common.labels.names')}
			nameCardDescription={t('userProfile.nameDescription')}
			demographicsCardTitle={t('common.labels.demographics')}
			demographicsCardDescription={t(
				'userProfile.demographicsDescription'
			)}
			contactCardTitle={t('common.labels.contacts')}
			contactCardDescription={t('userProfile.contactDescription')}
			localeCardTitle={t('common.labels.locales')}
			localeCardDescription={t('userProfile.localeDescription')}
			language={language}
			contactTypesEndpoint={contactTypesEndpoint}
			gendersEndpoint={gendersEndpoint}
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
