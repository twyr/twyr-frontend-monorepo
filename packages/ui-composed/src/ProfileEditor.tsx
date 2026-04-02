import { useEffect, useMemo, useState } from 'react';
import {
	Button,
	Card,
	Dialog,
	Input,
	Popover,
	Select,
	StarFilledIcon,
	StarIcon,
	Tooltip,
	TrashIcon
} from '@twyr/ui-kit';
import {
	fetchGenderOptions,
	fetchContactTypeOptions,
	normalizeDateOnlyValue,
	type AppLanguageCode,
	type ContactTypeOption,
	type GenderOption
} from '@twyr/core';
import { useLocalizedPageRequests } from '@twyr/app-providers/src/page-requests';
import { useTwyrTranslation } from '@twyr/i18n';
import { Paragraph, Text, XStack, YStack } from 'tamagui';
import { DatePicker } from './DatePicker';

type ProfileName = {
	id?: string;
	localeCode: string;
	firstName: string;
	middleNames: string;
	lastName: string;
	nickname: string;
};

type ProfileContact = {
	id?: string;
	typeName: string;
	typeId?: string;
	value: string;
	verified: boolean;
	isPrimary: boolean;
};

type ProfileLocale = {
	id?: string;
	localeCode: string;
	localeId: string;
	isPrimary: boolean;
};

type ProfileForm = {
	id?: string;
	actorType: 'users' | 'system_administrators';
	genderId: string;
	dateOfBirth: string;
	names: ProfileName[];
	contacts: ProfileContact[];
	locales: ProfileLocale[];
};

type LanguageOption = {
	code: string;
	label: string;
};

type Props = {
	title: string;
	description: string;
	nameCardTitle: string;
	nameCardDescription: string;
	demographicsCardTitle: string;
	demographicsCardDescription: string;
	contactCardTitle: string;
	contactCardDescription: string;
	localeCardTitle: string;
	localeCardDescription: string;
	language: AppLanguageCode;
	contactTypesEndpoint: string;
	gendersEndpoint: string;
	profile: ProfileForm;
	languageOptions: LanguageOption[];
	onSave: (profile: ProfileForm) => Promise<void>;
	onAddContact: (contact: {
		typeId: string;
		typeName: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}) => Promise<ProfileForm | void>;
	onMakePrimaryContact: (contact: {
		id: string;
		typeName: string;
		value: string;
		verified: boolean;
		isPrimary: boolean;
	}) => Promise<ProfileForm | void>;
	onDeleteContact: (contactId: string) => Promise<ProfileForm | void>;
	onAddLocale: (locale: {
		localeId: string;
		isPrimary: boolean;
	}) => Promise<ProfileForm | void>;
	onMakePrimaryLocale: (locale: {
		id: string;
		localeId: string;
		isPrimary: boolean;
	}) => Promise<ProfileForm | void>;
	onDeleteLocale: (localeId: string) => Promise<ProfileForm | void>;
};

export function ProfileEditor({
	title,
	description,
	nameCardTitle,
	nameCardDescription,
	demographicsCardTitle,
	demographicsCardDescription,
	contactCardTitle,
	contactCardDescription,
	localeCardTitle,
	localeCardDescription,
	language,
	contactTypesEndpoint,
	gendersEndpoint,
	profile,
	languageOptions,
	onSave: _onSave,
	onAddContact,
	onMakePrimaryContact,
	onDeleteContact,
	onAddLocale,
	onMakePrimaryLocale,
	onDeleteLocale
}: Props) {
	const { t } = useTwyrTranslation();
	const { runRequest, unregisterRequest } =
		useLocalizedPageRequests(language);
	const [savedProfile, setSavedProfile] = useState(profile);
	const [nameDraft, setNameDraft] = useState(profile.names);
	const [demographicsDraft, setDemographicsDraft] = useState({
		genderId: profile.genderId,
		dateOfBirth: profile.dateOfBirth
	});
	const [contactsDraft, setContactsDraft] = useState(profile.contacts);
	const [localesDraft, setLocalesDraft] = useState(profile.locales);
	const [contactTypeOptions, setContactTypeOptions] = useState<
		ContactTypeOption[]
	>([]);
	const [genderOptions, setGenderOptions] = useState<GenderOption[]>([]);
	const [contactDialogOpen, setContactDialogOpen] = useState(false);
	const [selectedContactType, setSelectedContactType] =
		useState<ContactTypeOption | null>(null);
	const [newContactValue, setNewContactValue] = useState('');
	const [contactDialogError, setContactDialogError] = useState<string | null>(
		null
	);
	const [contactsError, setContactsError] = useState<string | null>(null);
	const [localesError, setLocalesError] = useState<string | null>(null);
	const primaryLocaleCode =
		localesDraft.find((locale) => locale.isPrimary)?.localeCode ??
		localesDraft[0]?.localeCode ??
		languageOptions[0]?.code ??
		'';
	const primaryNameIndex = useMemo(() => {
		const matchedIndex = nameDraft.findIndex(
			(name) => name.localeCode === primaryLocaleCode
		);
		return matchedIndex >= 0 ? matchedIndex : 0;
	}, [nameDraft, primaryLocaleCode]);
	// eslint-disable-next-line security/detect-object-injection
	const primaryName = nameDraft[primaryNameIndex] ?? {
		localeCode: primaryLocaleCode,
		firstName: '',
		middleNames: '',
		lastName: '',
		nickname: ''
	};
	const isNameDirty = !areNamesEqual(nameDraft, savedProfile.names);
	const isDemographicsDirty =
		demographicsDraft.genderId !== savedProfile.genderId ||
		demographicsDraft.dateOfBirth !== savedProfile.dateOfBirth;
	const contactTypeDisplayNames = useMemo(
		() =>
			new Map(
				contactTypeOptions.map((option) => [
					option.name,
					option.displayName
				])
			),
		[contactTypeOptions]
	);
	useEffect(() => {
		setSavedProfile(profile);
		setNameDraft(profile.names);
		setDemographicsDraft({
			genderId: profile.genderId,
			dateOfBirth: profile.dateOfBirth
		});
		setContactsDraft(profile.contacts);
		setLocalesDraft(profile.locales);
	}, [profile]);

	useEffect(() => {
		let cancelled = false;
		void runRequest('contact-types', async (locale) => {
			const options = await fetchContactTypeOptions(
				contactTypesEndpoint,
				locale
			);
			if (cancelled) {
				return;
			}

			setContactTypeOptions(options);
			setSelectedContactType((currentSelection) => {
				if (!currentSelection) {
					return options[0] ?? null;
				}

				return (
					options.find(
						(option) => option.name === currentSelection.name
					) ??
					options[0] ??
					null
				);
			});
		});

		return () => {
			cancelled = true;
			unregisterRequest('contact-types');
		};
	}, [contactTypesEndpoint, runRequest, unregisterRequest]);

	useEffect(() => {
		let cancelled = false;
		void runRequest('genders', async (locale) => {
			const options = await fetchGenderOptions(gendersEndpoint, locale);
			if (cancelled) {
				return;
			}

			setGenderOptions(options);
		});

		return () => {
			cancelled = true;
			unregisterRequest('genders');
		};
	}, [gendersEndpoint, runRequest, unregisterRequest]);

	const resetContactDialog = () => {
		setContactDialogOpen(false);
		setNewContactValue('');
		setSelectedContactType(contactTypeOptions[0] ?? null);
		setContactDialogError(null);
	};

	const updatePrimaryName = (
		key: 'firstName' | 'middleNames' | 'lastName' | 'nickname',
		value: string
	) => {
		setNameDraft((current) => {
			const nextNames = [...current];
			const nextName = {
				// eslint-disable-next-line security/detect-object-injection
				...(nextNames[primaryNameIndex] ?? {
					localeCode: primaryLocaleCode
				}),
				firstName:
					// eslint-disable-next-line security/detect-object-injection
					(nextNames[primaryNameIndex]?.firstName as string) ?? '',
				middleNames:
					// eslint-disable-next-line security/detect-object-injection
					(nextNames[primaryNameIndex]?.middleNames as string) ?? '',
				lastName:
					// eslint-disable-next-line security/detect-object-injection
					(nextNames[primaryNameIndex]?.lastName as string) ?? '',
				nickname:
					// eslint-disable-next-line security/detect-object-injection
					(nextNames[primaryNameIndex]?.nickname as string) ?? '',

				[key]: value
			};

			// eslint-disable-next-line security/detect-object-injection
			if (primaryNameIndex >= 0 && nextNames[primaryNameIndex]) {
				// eslint-disable-next-line security/detect-object-injection
				nextNames[primaryNameIndex] = nextName;
			} else {
				nextNames.push(nextName);
			}

			return nextNames;
		});
	};

	const removeContact = async (index: number) => {
		// eslint-disable-next-line security/detect-object-injection
		const contact = contactsDraft[index];
		if (!contact?.id) {
			return;
		}

		try {
			setContactsError(null);
			const nextProfile = await onDeleteContact(contact.id);
			if (!nextProfile) {
				return;
			}

			setSavedProfile(nextProfile);
			setNameDraft(nextProfile.names);
			setContactsDraft(nextProfile.contacts);
			setLocalesDraft(nextProfile.locales);
		} catch (error) {
			setContactsError(
				error instanceof Error
					? error.message
					: t('profileEditor.cannotDeleteContact')
			);
		}
	};

	const makePrimaryContact = async (index: number) => {
		// eslint-disable-next-line security/detect-object-injection
		const contact = contactsDraft[index];
		if (!contact?.id) {
			return;
		}

		try {
			setContactsError(null);
			const nextProfile = await onMakePrimaryContact({
				id: contact.id,
				typeName: contact.typeName,
				value: contact.value,
				verified: contact.verified,
				isPrimary: true
			});
			if (!nextProfile) {
				return;
			}

			setSavedProfile(nextProfile);
			setNameDraft(nextProfile.names);
			setContactsDraft(nextProfile.contacts);
			setLocalesDraft(nextProfile.locales);
		} catch (error) {
			setContactsError(
				error instanceof Error
					? error.message
					: t('profileEditor.cannotUpdatePrimaryContact')
			);
		}
	};

	const toggleLocale = async (code: string, enabled: boolean) => {
		try {
			setLocalesError(null);
			if (enabled) {
				const nextProfile = await onAddLocale({
					localeId: code,
					isPrimary: false
				});
				if (!nextProfile) {
					return;
				}

				setSavedProfile(nextProfile);
				setNameDraft(nextProfile.names);
				setContactsDraft(nextProfile.contacts);
				setLocalesDraft(nextProfile.locales);
				return;
			}

			const localeToDelete = localesDraft.find(
				(locale) => locale.localeCode === code
			);
			if (!localeToDelete?.id) {
				return;
			}

			const nextProfile = await onDeleteLocale(localeToDelete.id);
			if (!nextProfile) {
				return;
			}

			setSavedProfile(nextProfile);
			setNameDraft(nextProfile.names);
			setContactsDraft(nextProfile.contacts);
			setLocalesDraft(nextProfile.locales);
		} catch (error) {
			setLocalesError(
				error instanceof Error
					? error.message
					: enabled
						? t('profileEditor.cannotAddLocale')
						: t('profileEditor.cannotDeleteLocale')
			);
		}
	};

	const makePrimaryLocale = async (locale: ProfileLocale) => {
		if (!locale.id) {
			return;
		}

		try {
			setLocalesError(null);
			const nextProfile = await onMakePrimaryLocale({
				id: locale.id,
				localeId: locale.localeId,
				isPrimary: true
			});
			if (!nextProfile) {
				return;
			}

			setSavedProfile(nextProfile);
			setNameDraft(nextProfile.names);
			setContactsDraft(nextProfile.contacts);
			setLocalesDraft(nextProfile.locales);
		} catch (error) {
			setLocalesError(
				error instanceof Error
					? error.message
					: t('profileEditor.cannotUpdatePrimaryLocale')
			);
		}
	};

	const saveNames = async () => {
		const nextProfile = {
			...savedProfile,
			names: nameDraft
		};
		await _onSave(nextProfile);
		setSavedProfile(nextProfile);
	};

	const saveDemographics = async () => {
		const nextProfile = {
			...savedProfile,
			genderId: demographicsDraft.genderId,
			dateOfBirth: normalizeDateOnlyValue(demographicsDraft.dateOfBirth)
		};
		await _onSave(nextProfile);
		setSavedProfile(nextProfile);
		setDemographicsDraft({
			genderId: nextProfile.genderId,
			dateOfBirth: nextProfile.dateOfBirth
		});
	};

	const addContact = async () => {
		if (
			!selectedContactType?.id ||
			!selectedContactType.name ||
			!newContactValue.trim()
		) {
			return;
		}

		try {
			setContactDialogError(null);
			const nextProfile = await onAddContact({
				typeId: selectedContactType.id,
				typeName: selectedContactType.name,
				value: newContactValue.trim(),
				verified: true,
				isPrimary: false
			});
			if (nextProfile) {
				setSavedProfile(nextProfile);
				setNameDraft(nextProfile.names);
				setContactsDraft(nextProfile.contacts);
				setLocalesDraft(nextProfile.locales);
			}
			resetContactDialog();
		} catch (error) {
			setContactDialogError(
				error instanceof Error
					? error.message
					: t('profileEditor.addContactFailed')
			);
		}
	};

	return (
		<YStack gap="$5">
			<YStack gap="$2">
				<Text fontSize="$10" fontWeight="700" color="$color">
					{title}
				</Text>
				<Text color="$colorHover">{description}</Text>
			</YStack>

			<Card
				title={nameCardTitle}
				description={nameCardDescription}
				footer={
					<CardFooter
						dirty={isNameDirty}
						onCancel={() => setNameDraft(savedProfile.names)}
						onSave={saveNames}
					/>
				}
			>
				<XStack gap="$3" flexWrap="wrap" alignItems="flex-end">
					<NameField
						label={t('common.labels.firstName')}
						value={primaryName.firstName}
						onChangeText={(value) =>
							updatePrimaryName('firstName', value)
						}
					/>
					<NameField
						label={t('common.labels.middleNames')}
						value={primaryName.middleNames}
						onChangeText={(value) =>
							updatePrimaryName('middleNames', value)
						}
					/>
					<NameField
						label={t('common.labels.lastName')}
						value={primaryName.lastName}
						onChangeText={(value) =>
							updatePrimaryName('lastName', value)
						}
					/>
					<NameField
						label={t('common.labels.nickname')}
						value={primaryName.nickname}
						onChangeText={(value) =>
							updatePrimaryName('nickname', value)
						}
					/>
				</XStack>
			</Card>

			<Card
				title={demographicsCardTitle}
				description={demographicsCardDescription}
				footer={
					<CardFooter
						dirty={isDemographicsDirty}
						onCancel={() => {
							setDemographicsDraft({
								genderId: savedProfile.genderId,
								dateOfBirth: savedProfile.dateOfBirth
							});
						}}
						onSave={saveDemographics}
					/>
				}
			>
				<XStack gap="$3" flexWrap="wrap" alignItems="flex-end">
					<YStack
						width="32%"
						minWidth={220}
						gap="$2"
						$md={{ width: '100%' }}
					>
						<Paragraph size="$2" color="$colorMuted">
							{t('common.labels.gender')}
						</Paragraph>
						<Select
							value={demographicsDraft.genderId}
							onValueChange={(value) => {
								setDemographicsDraft((current) => ({
									...current,
									genderId: value
								}));
							}}
							options={[
								{
									label: t('profileEditor.unspecified'),
									value: ''
								},
								...genderOptions.map((option) => ({
									label: option.label,
									value: option.id
								}))
							]}
							placeholder={t('common.placeholders.gender')}
						/>
					</YStack>
					<YStack
						width="32%"
						minWidth={220}
						gap="$2"
						$md={{ width: '100%' }}
					>
						<Paragraph size="$2" color="$colorMuted">
							{t('common.labels.dateOfBirth')}
						</Paragraph>
						<DatePicker
							value={demographicsDraft.dateOfBirth}
							hideLabel
							onChange={(value) => {
								setDemographicsDraft((current) => ({
									...current,
									dateOfBirth: value
								}));
							}}
						/>
					</YStack>
				</XStack>
			</Card>

			<YStack gap="$4">
				<YStack width="100%">
					<Card
						title={localeCardTitle}
						description={localeCardDescription}
					>
						<YStack gap="$4">
							<YStack gap="$2">
								<Paragraph size="$2" color="$colorMuted">
									{t('common.labels.availableLocales')}
								</Paragraph>
								<XStack gap="$2" flexWrap="wrap">
									{languageOptions.map((option) => {
										const selectedLocale =
											localesDraft.find(
												(locale) =>
													locale.localeCode ===
													option.code
											);

										const localeButton = (
											<Button
												key={option.code}
												tone={
													selectedLocale
														? 'primary'
														: 'neutral'
												}
												onPress={() => {
													if (!selectedLocale) {
														void toggleLocale(
															option.code,
															true
														);
													}
												}}
											>
												<XStack
													gap="$2"
													alignItems="center"
												>
													<Text>{option.label}</Text>
													{selectedLocale?.isPrimary ? (
														<StarFilledIcon />
													) : null}
												</XStack>
											</Button>
										);

										if (!selectedLocale) {
											return localeButton;
										}

										return (
											<Popover
												key={option.code}
												trigger={localeButton}
												contentProps={{
													padding: '$2',
													gap: '$2'
												}}
											>
												<YStack gap="$2">
													<Button
														tone="neutral"
														onPress={() => {
															void toggleLocale(
																option.code,
																false
															);
														}}
													>
														{t(
															'common.actions.deselect'
														)}
													</Button>
													<Button
														tone="neutral"
														disabled={
															selectedLocale.isPrimary
														}
														opacity={
															selectedLocale.isPrimary
																? 0.45
																: 1
														}
														onPress={() => {
															void makePrimaryLocale(
																selectedLocale
															);
														}}
													>
														{t(
															'common.actions.makePrimary'
														)}
													</Button>
												</YStack>
											</Popover>
										);
									})}
								</XStack>
							</YStack>
							{localesError ? (
								<Text color="$danger">{localesError}</Text>
							) : null}
						</YStack>
					</Card>
				</YStack>

				<YStack width="100%">
					<Card
						title={contactCardTitle}
						description={contactCardDescription}
						footer={
							<Button
								tone="primary"
								onPress={() => setContactDialogOpen(true)}
							>
								{t('common.actions.add')}
							</Button>
						}
					>
						<YStack
							borderWidth={1}
							borderColor="$borderColor"
							borderRadius="$4"
							overflow="hidden"
						>
							<ContactTableHeader />
							{contactsDraft.map((contact, index) => (
								<ContactTableRow
									key={
										contact.id ??
										`${contact.typeName}-${contact.value}`
									}
									contact={contact}
									displayTypeName={
										contactTypeDisplayNames.get(
											contact.typeName
										) ?? formatContactType(contact.typeName)
									}
									onDelete={() => {
										void removeContact(index);
									}}
									onMakePrimary={() => {
										void makePrimaryContact(index);
									}}
								/>
							))}
						</YStack>
						{contactsError ? (
							<Text color="$danger">{contactsError}</Text>
						) : null}
					</Card>
				</YStack>
			</YStack>
			<Dialog
				open={contactDialogOpen}
				onOpenChange={(open) => {
					if (!open) {
						resetContactDialog();
						return;
					}

					setContactDialogOpen(open);
				}}
				title={t('common.actions.add')}
				description={t('profileEditor.addContactDescription')}
				confirmLabel={t('common.actions.save')}
				cancelLabel={t('common.actions.cancel')}
				confirmDisabled={
					!selectedContactType?.name ||
					!selectedContactType.id ||
					newContactValue.trim().length === 0
				}
				onConfirm={() => {
					void addContact();
				}}
			>
				<YStack gap="$3">
					<YStack gap="$2">
						<Paragraph size="$2" color="$colorMuted">
							{t('profileEditor.contactType')}
						</Paragraph>
						<Select
							value={selectedContactType?.name ?? ''}
							onValueChange={(value) => {
								setSelectedContactType(
									contactTypeOptions.find(
										(option) => option.name === value
									) ?? null
								);
							}}
							options={contactTypeOptions.map((option) => ({
								label: option.displayName,
								value: option.name
							}))}
							placeholder={t('common.placeholders.contactType')}
						/>
					</YStack>
					<YStack gap="$2">
						<Paragraph size="$2" color="$colorMuted">
							{t('profileEditor.contactValue')}
						</Paragraph>
						<Input
							value={newContactValue}
							onChangeText={setNewContactValue}
							placeholder={t('common.placeholders.contactValue')}
						/>
					</YStack>
					{contactDialogError ? (
						<Text color="$danger">{contactDialogError}</Text>
					) : null}
				</YStack>
			</Dialog>
		</YStack>
	);
}

function NameField({
	label,
	value,
	onChangeText
}: {
	label: string;
	value: string;
	onChangeText: (value: string) => void;
}) {
	return (
		<YStack width="24%" minWidth={180} $md={{ width: '100%' }}>
			<Paragraph size="$2" color="$colorMuted">
				{label}
			</Paragraph>
			<Input
				value={value}
				onChangeText={onChangeText}
				placeholder={label}
			/>
		</YStack>
	);
}

function CardFooter({
	dirty,
	onCancel,
	onSave
}: {
	dirty: boolean;
	onCancel: () => void;
	onSave: () => Promise<void>;
}) {
	const { t } = useTwyrTranslation();
	return (
		<XStack gap="$2">
			<Button
				tone="neutral"
				disabled={!dirty}
				opacity={dirty ? 1 : 0.45}
				onPress={onCancel}
			>
				{t('common.actions.cancel')}
			</Button>
			<Button
				tone={dirty ? 'primary' : 'neutral'}
				disabled={!dirty}
				opacity={dirty ? 1 : 0.45}
				onPress={() => void onSave()}
			>
				{t('common.actions.save')}
			</Button>
		</XStack>
	);
}

function ContactTableHeader() {
	const { t } = useTwyrTranslation();
	return (
		<XStack
			paddingHorizontal="$3"
			paddingVertical="$2"
			borderBottomWidth={1}
			borderColor="$borderColor"
			backgroundColor="$backgroundSoft"
			alignItems="center"
		>
			<TableCell width="22%">
				<Paragraph size="$2" fontWeight="700">
					{t('profileEditor.type')}
				</Paragraph>
			</TableCell>
			<TableCell width="44%">
				<Paragraph size="$2" fontWeight="700">
					{t('common.labels.contacts')}
				</Paragraph>
			</TableCell>
			<TableCell width="16%">
				<Paragraph size="$2" fontWeight="700">
					{t('profileEditor.verified')}
				</Paragraph>
			</TableCell>
			<TableCell width="18%" alignItems="flex-end">
				<Paragraph size="$2" fontWeight="700">
					{t('common.labels.actions')}
				</Paragraph>
			</TableCell>
		</XStack>
	);
}

function ContactTableRow({
	contact,
	displayTypeName,
	onDelete,
	onMakePrimary
}: {
	contact: ProfileContact;
	displayTypeName: string;
	onDelete: () => void;
	onMakePrimary: () => void;
}) {
	const { t } = useTwyrTranslation();
	return (
		<XStack
			paddingHorizontal="$3"
			paddingVertical="$3"
			borderBottomWidth={1}
			borderColor="$borderColor"
			alignItems="center"
		>
			<TableCell width="22%">
				<Text>{displayTypeName}</Text>
			</TableCell>
			<TableCell width="44%">
				<Text>{contact.value}</Text>
			</TableCell>
			<TableCell width="16%">
				<Text>
					{contact.verified
						? t('profileEditor.yes')
						: t('profileEditor.no')}
				</Text>
			</TableCell>
			<TableCell width="18%" alignItems="flex-end">
				<XStack gap="$1" alignItems="center">
					{contact.isPrimary ? (
						<Tooltip content={t('common.tooltips.primaryContact')}>
							<YStack>
								<StarFilledIcon />
							</YStack>
						</Tooltip>
					) : (
						<>
							<Tooltip content={t('common.tooltips.makePrimary')}>
								<Button
									chromeless
									padding={0}
									minWidth={32}
									height={32}
									aria-label={`Make ${contact.value} primary`}
									onPress={onMakePrimary}
								>
									<StarIcon />
								</Button>
							</Tooltip>
							<Tooltip
								content={t('common.tooltips.deleteContact')}
							>
								<Button
									chromeless
									padding={0}
									minWidth={32}
									height={32}
									aria-label={`Delete ${contact.value}`}
									onPress={onDelete}
								>
									<TrashIcon />
								</Button>
							</Tooltip>
						</>
					)}
				</XStack>
			</TableCell>
		</XStack>
	);
}

function TableCell({
	children,
	width,
	alignItems = 'flex-start'
}: {
	children: React.ReactNode;
	width: string;
	alignItems?: 'flex-start' | 'center' | 'flex-end';
}) {
	return (
		<YStack width={width} paddingRight="$2" alignItems={alignItems}>
			{children}
		</YStack>
	);
}

function formatContactType(typeName: string) {
	if (typeName.length === 0) {
		return '';
	}

	return `${typeName[0]?.toUpperCase() ?? ''}${typeName.slice(1)}`;
}

function areNamesEqual(left: ProfileName[], right: ProfileName[]) {
	return JSON.stringify(left) === JSON.stringify(right);
}
