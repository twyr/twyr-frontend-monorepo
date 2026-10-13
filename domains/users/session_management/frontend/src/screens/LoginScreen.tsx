import { useEffect, useMemo, useState } from 'react';
import {
	fetchCountryCodeOptions,
	fetchGenderOptions,
	formatCountryCodeOptionLabel,
	getDefaultCountryCodeValue,
	parseDateOnlyValue,
	type CountryCodeOption,
	type AppLanguageCode,
	type PortalRegistrationDraft
} from '@twyr/core';
import { useLocalizedPageRequests } from '@twyr/app-providers/src/page-requests';
import { useTwyrTranslation } from '@twyr/i18n';
import { DatePicker } from '@twyr/ui-composed';
import { Button, Card, Input, Select, Tabs } from '@twyr/ui-kit';
import { Text, XStack, YStack, Paragraph, useMedia } from 'tamagui';

type LanguageOption = {
	code: string;
	label: string;
};

type Props = {
	selectedLanguage: AppLanguageCode;
	languageOptions: LanguageOption[];
	countryOptionsEndpoint: string;
	gendersEndpoint: string;
	requestOtp: (phoneNumber: string) => Promise<string>;
	validateOtp: (phoneNumber: string, otp: string) => Promise<void>;
	login: (phoneNumber: string, otp: string) => Promise<void>;
	register: (draft: PortalRegistrationDraft) => Promise<void>;
	onLanguageChange: (language: AppLanguageCode) => void;
	onLoginSuccess?: () => void;
};

type MessageTone = 'error' | 'success';

const COUNTRY_CODE = '+91';

export function LoginScreen({
	selectedLanguage,
	languageOptions,
	countryOptionsEndpoint,
	gendersEndpoint,
	requestOtp,
	validateOtp,
	login,
	register,
	onLanguageChange,
	onLoginSuccess
}: Props) {
	const { t } = useTwyrTranslation();
	const media = useMedia();
	const { runRequest, unregisterRequest } =
		useLocalizedPageRequests(selectedLanguage);
	const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
	const [loginPhoneNumber, setLoginPhoneNumber] = useState('');
	const [loginOtp, setLoginOtp] = useState('');
	const [loginOtpRequested, setLoginOtpRequested] = useState(false);
	const [countryOptions, setCountryOptions] = useState<CountryCodeOption[]>(
		[]
	);
	const [genderOptions, setGenderOptions] = useState<
		Array<{ id: string; label: string }>
	>([]);
	const [loginCountryCode, setLoginCountryCode] = useState('IN');
	const [registrationStep, setRegistrationStep] = useState<1 | 2 | 3 | 4>(1);
	const [registrationPhoneNumber, setRegistrationPhoneNumber] = useState('');
	const [registrationOtp, setRegistrationOtp] = useState('');
	const [registrationOtpRequested, setRegistrationOtpRequested] =
		useState(false);
	const [registrationCountryCode, setRegistrationCountryCode] =
		useState('IN');
	const [firstName, setFirstName] = useState('');
	const [middleNames, setMiddleNames] = useState('');
	const [lastName, setLastName] = useState('');
	const [nickname, setNickname] = useState('');
	const [genderId, setGenderId] = useState('');
	const [dateOfBirth, setDateOfBirth] = useState('');
	const [message, setMessage] = useState<{
		tone: MessageTone;
		text: string;
	} | null>(null);

	const resetMessage = () => {
		setMessage(null);
	};

	const showSuccess = (text: string) => {
		setMessage({ tone: 'success', text });
	};

	const showError = (text: string) => {
		setMessage({ tone: 'error', text });
	};

	const loginDisabled = loginPhoneNumber.length !== 10;
	const loginOtpDisabled = loginOtp.length !== 4;
	const registrationPhoneDisabled = registrationPhoneNumber.length !== 10;
	const registrationOtpDisabled = registrationOtp.length !== 4;
	const registrationIdentityDisabled =
		firstName.trim().length === 0 || lastName.trim().length === 0;
	const registrationDemographicsDisabled =
		genderId.trim().length === 0 || dateOfBirth.trim().length === 0;
	const countrySelectOptions = useMemo(
		() =>
			countryOptions.map((option) => ({
				label: formatCountryCodeOptionLabel(option),
				value: option.iso_code
			})),
		[countryOptions]
	);
	const genderSelectOptions = useMemo(
		() =>
			genderOptions.map((option) => ({
				label: option.label,
				value: option.id
			})),
		[genderOptions]
	);
	const selectedGenderLabel =
		genderOptions.find((option) => option.id === genderId)?.label ?? '';

	useEffect(() => {
		let cancelled = false;
		void runRequest('country-codes', async (locale) => {
			const options = await fetchCountryCodeOptions(
				countryOptionsEndpoint,
				locale
			);
			if (cancelled || options.length === 0) {
				return;
			}

			setCountryOptions(options);
			const defaultCountryCode = getDefaultCountryCodeValue(options);
			setLoginCountryCode(defaultCountryCode);
			setRegistrationCountryCode(defaultCountryCode);
		});

		return () => {
			cancelled = true;
			unregisterRequest('country-codes');
		};
	}, [countryOptionsEndpoint, runRequest, unregisterRequest]);

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

	return (
		<YStack
			flexGrow={0}
			flexShrink={0}
			justifyContent="center"
			paddingVertical="8"
			paddingHorizontal={media.xs ? '6' : '8'}
		>
			<YStack maxWidth={760} width="100%" alignSelf="center" gap="5">
				<Card padding={media.xs ? '5' : '6'}>
					<Tabs
						gap="3"
						value={activeTab}
						onValueChange={(value) => {
							if (value === 'login' || value === 'register') {
								setActiveTab(value);
								resetMessage();
							}
						}}
					>
						<Tabs.List
							width="100%"
							borderRadius={0}
							borderBottomWidth={1}
							borderBottomColor="border-color"
						>
							{(['login', 'register'] as const).map((value) => (
								<Tabs.Tab
									key={value}
									value={value}
									flex={1}
									alignItems="center"
									backgroundColor="transparent hover:background-hover press:background-press"
									borderRadius={0}
									borderBottomWidth={2}
									borderBottomColor={
										activeTab === value
											? 'primary'
											: 'transparent'
									}
									paddingHorizontal="4"
									paddingTop="2"
									paddingBottom="3"
								>
									<Text
										color={
											activeTab === value
												? 'primary'
												: 'colorMuted'
										}
										fontWeight="600"
									>
										{t(
											value === 'login'
												? 'common.actions.login'
												: 'userLogin.register'
										)}
									</Text>
								</Tabs.Tab>
							))}
						</Tabs.List>

						{activeTab === 'login' ? (
							<Tabs.Content value="login" gap="4">
								<Select
									value={selectedLanguage}
									onValueChange={(value) =>
										onLanguageChange(
											value as AppLanguageCode
										)
									}
									zIndex={200000}
								>
									<Select.Trigger>
										<Select.Value
											placeholder={t(
												'common.placeholders.language'
											)}
										/>
										<Select.Icon />
									</Select.Trigger>
									<Select.Content>
										<Select.Viewport>
											<Select.Group>
												{languageOptions.map(
													(option) => (
														<Select.Item
															key={option.code}
															value={option.code}
														>
															<Select.ItemText>
																{option.label}
															</Select.ItemText>
															<Select.ItemIndicator />
														</Select.Item>
													)
												)}
											</Select.Group>
										</Select.Viewport>
									</Select.Content>
								</Select>
								<PhoneNumberRow
									countryCode={loginCountryCode}
									onCountryCodeChange={setLoginCountryCode}
									countrySelectOptions={countrySelectOptions}
									phoneNumber={loginPhoneNumber}
									onPhoneNumberChange={(value) => {
										setLoginPhoneNumber(
											value
												.replace(/\D/g, '')
												.slice(0, 10)
										);
										setLoginOtpRequested(false);
										setLoginOtp('');
										resetMessage();
									}}
								/>
								{loginOtpRequested ? (
									<Input
										placeholder={t(
											'common.placeholders.otp'
										)}
										value={loginOtp}
										onChangeText={(value) => {
											setLoginOtp(
												value
													.replace(/\D/g, '')
													.slice(0, 4)
											);
											resetMessage();
										}}
										keyboardType="number-pad"
									/>
								) : null}
								<Button
									onPress={async () => {
										try {
											if (!loginOtpRequested) {
												const otp =
													await requestOtp(
														loginPhoneNumber
													);
												setLoginOtpRequested(true);
												showSuccess(
													otp ||
														t('userLogin.otpSent', {
															countryCode:
																loginCountryCode,
															phoneNumber:
																loginPhoneNumber
														})
												);
												return;
											}

											await login(
												loginPhoneNumber,
												loginOtp
											);
											showSuccess(
												t('userLogin.sessionStarted')
											);
											onLoginSuccess?.();
										} catch (error) {
											showError(
												error instanceof Error
													? error.message
													: t('userLogin.loginFailed')
											);
										}
									}}
									disabled={
										loginOtpRequested
											? loginOtpDisabled
											: loginDisabled
									}
								>
									{loginOtpRequested
										? t('common.actions.login')
										: t('common.actions.generateOtp')}
								</Button>
							</Tabs.Content>
						) : (
							<Tabs.Content value="register" gap="4">
								<Text color="color-hover">
									{t('common.status.stepOf', {
										step: registrationStep,
										total: 4
									})}
								</Text>

								{registrationStep === 1 ? (
									<YStack gap="4">
										<Select
											value={selectedLanguage}
											onValueChange={(value) =>
												onLanguageChange(
													value as AppLanguageCode
												)
											}
											zIndex={200000}
										>
											<Select.Trigger>
												<Select.Value
													placeholder={t(
														'common.placeholders.language'
													)}
												/>
												<Select.Icon />
											</Select.Trigger>
											<Select.Content>
												<Select.Viewport>
													<Select.Group>
														{languageOptions.map(
															(option) => (
																<Select.Item
																	key={
																		option.code
																	}
																	value={
																		option.code
																	}
																>
																	<Select.ItemText>
																		{
																			option.label
																		}
																	</Select.ItemText>
																	<Select.ItemIndicator />
																</Select.Item>
															)
														)}
													</Select.Group>
												</Select.Viewport>
											</Select.Content>
										</Select>
										<Select
											value={registrationCountryCode}
											onValueChange={
												setRegistrationCountryCode
											}
											zIndex={200000}
										>
											<Select.Trigger>
												<Select.Value
													placeholder={t(
														'common.placeholders.country'
													)}
												/>
												<Select.Icon />
											</Select.Trigger>
											<Select.Content>
												<Select.Viewport>
													<Select.Group>
														{countrySelectOptions.map(
															(option) => (
																<Select.Item
																	key={
																		option.value
																	}
																	value={
																		option.value
																	}
																>
																	<Select.ItemText>
																		{
																			option.label
																		}
																	</Select.ItemText>
																	<Select.ItemIndicator />
																</Select.Item>
															)
														)}
													</Select.Group>
												</Select.Viewport>
											</Select.Content>
										</Select>
										<Input
											placeholder={t(
												'common.placeholders.mobileNumber'
											)}
											value={registrationPhoneNumber}
											onChangeText={(value) => {
												setRegistrationPhoneNumber(
													value
														.replace(/\D/g, '')
														.slice(0, 10)
												);
												setRegistrationOtpRequested(
													false
												);
												setRegistrationOtp('');
												resetMessage();
											}}
											keyboardType="number-pad"
										/>
										{registrationOtpRequested ? (
											<Input
												placeholder={t(
													'common.placeholders.validateOtp'
												)}
												value={registrationOtp}
												onChangeText={(value) => {
													setRegistrationOtp(
														value
															.replace(/\D/g, '')
															.slice(0, 4)
													);
													resetMessage();
												}}
												keyboardType="number-pad"
											/>
										) : null}
										<Button
											onPress={async () => {
												try {
													if (
														!registrationOtpRequested
													) {
														const otp =
															await requestOtp(
																registrationPhoneNumber
															);
														setRegistrationOtpRequested(
															true
														);
														showSuccess(
															otp ||
																t(
																	'userLogin.otpSent',
																	{
																		countryCode:
																			registrationCountryCode,
																		phoneNumber:
																			registrationPhoneNumber
																	}
																)
														);
														return;
													}

													if (
														registrationOtpDisabled
													) {
														return;
													}

													await validateOtp(
														registrationPhoneNumber,
														registrationOtp
													);
													setRegistrationStep(2);
													showSuccess(
														t(
															'userLogin.otpVerified'
														)
													);
												} catch (error) {
													showError(
														error instanceof Error
															? error.message
															: t(
																	'userLogin.validateOtpFailed'
																)
													);
												}
											}}
											disabled={
												registrationOtpRequested
													? registrationOtpDisabled
													: registrationPhoneDisabled
											}
										>
											{registrationOtpRequested
												? t(
														'common.actions.validateOtp'
													)
												: t(
														'common.actions.generateOtp'
													)}
										</Button>
									</YStack>
								) : null}

								{registrationStep === 2 ? (
									<YStack gap="4">
										<YStack gap="2">
											<Text color="colorMuted">
												{t(
													'registration.firstNameRequired'
												)}
											</Text>
											<Input
												placeholder={t(
													'common.labels.firstName'
												)}
												value={firstName}
												onChangeText={setFirstName}
											/>
										</YStack>
										<Input
											placeholder={t(
												'common.labels.middleNames'
											)}
											value={middleNames}
											onChangeText={setMiddleNames}
										/>
										<YStack gap="2">
											<Text color="colorMuted">
												{t(
													'registration.lastNameRequired'
												)}
											</Text>
											<Input
												placeholder={t(
													'common.labels.lastName'
												)}
												value={lastName}
												onChangeText={setLastName}
											/>
										</YStack>
										<Input
											placeholder={t(
												'common.labels.nickname'
											)}
											value={nickname}
											onChangeText={setNickname}
										/>
										<XStack gap="3">
											<Button
												tone="neutral"
												onPress={() =>
													setRegistrationStep(1)
												}
											>
												{t('common.actions.back')}
											</Button>
											<Button
												onPress={() =>
													setRegistrationStep(3)
												}
												disabled={
													registrationIdentityDisabled
												}
											>
												{t('common.actions.continue')}
											</Button>
										</XStack>
									</YStack>
								) : null}

								{registrationStep === 3 ? (
									<YStack gap="4">
										<Select
											value={genderId}
											onValueChange={setGenderId}
											zIndex={200000}
										>
											<Select.Trigger>
												<Select.Value
													placeholder={t(
														'common.placeholders.gender'
													)}
												/>
												<Select.Icon />
											</Select.Trigger>
											<Select.Content>
												<Select.Viewport>
													<Select.Group>
														{genderSelectOptions.map(
															(option) => (
																<Select.Item
																	key={
																		option.value
																	}
																	value={
																		option.value
																	}
																>
																	<Select.ItemText>
																		{
																			option.label
																		}
																	</Select.ItemText>
																	<Select.ItemIndicator />
																</Select.Item>
															)
														)}
													</Select.Group>
												</Select.Viewport>
											</Select.Content>
										</Select>
										<DatePicker
											label={t(
												'common.labels.dateOfBirth'
											)}
											value={dateOfBirth}
											onChange={setDateOfBirth}
										/>
										<XStack gap="3">
											<Button
												tone="neutral"
												onPress={() =>
													setRegistrationStep(2)
												}
											>
												{t('common.actions.back')}
											</Button>
											<Button
												onPress={() =>
													setRegistrationStep(4)
												}
												disabled={
													registrationDemographicsDisabled
												}
											>
												{t('common.actions.review')}
											</Button>
										</XStack>
									</YStack>
								) : null}

								{registrationStep === 4 ? (
									<YStack gap="4">
										<Card>
											<Card.Header>
												<Paragraph
													fontWeight="700"
													fontSize="6"
												>
													{t('common.actions.review')}
												</Paragraph>
												<Paragraph color="colorMuted">
													{t(
														'userLogin.reviewDescription'
													)}
												</Paragraph>
											</Card.Header>
											<YStack gap="2">
												<Text color="color-hover">
													{t(
														'common.labels.language'
													)}
													: {selectedLanguage}
												</Text>
												<Text color="color-hover">
													{t('common.labels.country')}
													: {registrationCountryCode}
												</Text>
												<Text color="color-hover">
													{t('common.labels.phone')}:{' '}
													{COUNTRY_CODE}{' '}
													{registrationPhoneNumber}
												</Text>
												<Text color="color-hover">
													{t('common.labels.name')}:{' '}
													{[
														firstName,
														middleNames,
														lastName
													]
														.filter(Boolean)
														.join(' ')}
												</Text>
												<Text color="color-hover">
													{t(
														'common.labels.nickname'
													)}
													:{' '}
													{nickname ||
														t(
															'common.values.notProvided'
														)}
												</Text>
												<Text color="color-hover">
													{t('common.labels.gender')}:{' '}
													{selectedGenderLabel ||
														t(
															'common.values.notSelected'
														)}
												</Text>
												<Text color="color-hover">
													{t(
														'common.labels.dateOfBirth'
													)}
													:{' '}
													{formatHumanFriendlyDate(
														dateOfBirth,
														selectedLanguage,
														t(
															'common.values.notSelected'
														)
													)}
												</Text>
											</YStack>
										</Card>
										<XStack gap="3">
											<Button
												tone="neutral"
												onPress={() =>
													setRegistrationStep(3)
												}
											>
												{t('common.actions.back')}
											</Button>
											<Button
												onPress={async () => {
													try {
														await register({
															phoneNumber:
																registrationPhoneNumber,
															otp: registrationOtp,
															firstName,
															middleNames,
															lastName,
															nickname,
															genderId,
															dateOfBirth
														});
														setActiveTab('login');
														setRegistrationStep(1);
														setRegistrationOtpRequested(
															false
														);
														setRegistrationOtp('');
														showSuccess(
															t(
																'userLogin.profileCreated'
															)
														);
													} catch (error) {
														showError(
															error instanceof
																Error
																? error.message
																: t(
																		'userLogin.createProfileFailed'
																	)
														);
													}
												}}
											>
												{t(
													'common.actions.createProfile'
												)}
											</Button>
										</XStack>
									</YStack>
								) : null}
							</Tabs.Content>
						)}

						{message ? (
							<Text
								color={
									message.tone === 'error'
										? 'danger'
										: 'success'
								}
							>
								{message.text}
							</Text>
						) : null}
					</Tabs>
				</Card>
			</YStack>
		</YStack>
	);
}

function PhoneNumberRow({
	countryCode,
	onCountryCodeChange,
	countrySelectOptions,
	phoneNumber,
	onPhoneNumberChange
}: {
	countryCode: string;
	onCountryCodeChange: (value: string) => void;
	countrySelectOptions: Array<{ label: string; value: string }>;
	phoneNumber: string;
	onPhoneNumberChange: (value: string) => void;
}) {
	const { t } = useTwyrTranslation();
	return (
		<YStack gap="3" width="100%">
			<YStack width="100%">
				<Select
					value={countryCode}
					onValueChange={onCountryCodeChange}
					zIndex={200000}
				>
					<Select.Trigger>
						<Select.Value
							placeholder={t('common.placeholders.country')}
						/>
						<Select.Icon />
					</Select.Trigger>
					<Select.Content>
						<Select.Viewport>
							<Select.Group>
								{countrySelectOptions.map((option) => (
									<Select.Item
										key={option.value}
										value={option.value}
									>
										<Select.ItemText>
											{option.label}
										</Select.ItemText>
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Group>
						</Select.Viewport>
					</Select.Content>
				</Select>
			</YStack>
			<YStack width="100%">
				<Input
					placeholder={t('common.placeholders.mobileNumber')}
					value={phoneNumber}
					onChangeText={onPhoneNumberChange}
					keyboardType="number-pad"
				/>
			</YStack>
		</YStack>
	);
}

function formatHumanFriendlyDate(
	value: string,
	locale: string,
	fallbackLabel: string
) {
	const parsedValue = parseDateOnlyValue(value);

	if (!parsedValue) {
		return fallbackLabel;
	}

	try {
		return new Intl.DateTimeFormat(locale, {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(parsedValue);
	} catch {
		return new Intl.DateTimeFormat(undefined, {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		}).format(parsedValue);
	}
}
