import { useEffect, useMemo, useState } from 'react';
import { fetchCountryCodeOptions, type AppLanguageCode } from '@twyr/core';
import { Button, Card, Input, Select } from '@twyr/ui-kit';
import { Text, XStack, YStack } from 'tamagui';

type LanguageOption = {
	code: string;
	label: string;
};

type RegistrationDraft = {
	phoneNumber: string;
	otp: string;
	firstName: string;
	middleNames: string;
	lastName: string;
	email: string;
	organization: string;
	roleTitle: string;
};

type Props = {
	selectedLanguage: AppLanguageCode;
	languageOptions: LanguageOption[];
	countryOptionsEndpoint: string;
	requestOtp: (phoneNumber: string) => Promise<string>;
	validateOtp: (phoneNumber: string, otp: string) => Promise<void>;
	login: (phoneNumber: string, otp: string) => Promise<void>;
	register: (draft: RegistrationDraft) => Promise<void>;
	onLanguageChange: (language: AppLanguageCode) => void;
	onLoginSuccess?: () => void;
};

type MessageTone = 'error' | 'success';

const COUNTRY_CODE = '+91';

export function LoginScreen({
	selectedLanguage,
	languageOptions,
	countryOptionsEndpoint,
	requestOtp,
	validateOtp,
	login,
	register,
	onLanguageChange,
	onLoginSuccess
}: Props) {
	const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
	const [loginPhoneNumber, setLoginPhoneNumber] = useState('');
	const [loginOtp, setLoginOtp] = useState('');
	const [loginOtpRequested, setLoginOtpRequested] = useState(false);
	const [countryOptions, setCountryOptions] = useState<CountryCodeOption[]>(
		[]
	);
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
	const [email, setEmail] = useState('');
	const [organization, setOrganization] = useState('');
	const [roleTitle, setRoleTitle] = useState('');
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
		firstName.trim().length === 0 || email.trim().length === 0;
	const registrationWorkspaceDisabled =
		organization.trim().length === 0 || roleTitle.trim().length === 0;
	const countrySelectOptions = useMemo(
		() =>
			countryOptions.map((option) => ({
				label: `${option.country_name} (${option.iso_code})`,
				value: option.iso_code
			})),
		[countryOptions]
	);

	useEffect(() => {
		let cancelled = false;

		const loadCountryCodes = async () => {
			const options = await fetchCountryCodeOptions(
				countryOptionsEndpoint,
				selectedLanguage
			);
			if (cancelled || options.length === 0) {
				return;
			}

			setCountryOptions(options);
			if (options.some((option) => option.iso_code === 'IN')) {
				setLoginCountryCode('IN');
				setRegistrationCountryCode('IN');
				return;
			}

			setLoginCountryCode(options[0].iso_code);
			setRegistrationCountryCode(options[0].iso_code);
		};

		void loadCountryCodes();

		return () => {
			cancelled = true;
		};
	}, [countryOptionsEndpoint, selectedLanguage]);

	return (
		<YStack flex={1} justifyContent="center" padding="$5">
			<YStack maxWidth={760} width="100%" alignSelf="center" gap="$5">
				<Card>
					<YStack gap="$4">
						<XStack gap="$3" flexWrap="wrap">
							<Button
								tone={
									activeTab === 'login'
										? 'primary'
										: 'neutral'
								}
								onPress={() => {
									setActiveTab('login');
									resetMessage();
								}}
							>
								Login
							</Button>
							<Button
								tone={
									activeTab === 'register'
										? 'primary'
										: 'neutral'
								}
								onPress={() => {
									setActiveTab('register');
									resetMessage();
								}}
							>
								Register
							</Button>
						</XStack>

						{activeTab === 'login' ? (
							<YStack gap="$4">
								<Text fontSize="$8" fontWeight="700">
									User login
								</Text>
								<Select
									value={selectedLanguage}
									onValueChange={(value) =>
										onLanguageChange(
											value as AppLanguageCode
										)
									}
									options={languageOptions.map((option) => ({
										label: option.label,
										value: option.code
									}))}
									placeholder="Select language"
								/>
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
										placeholder="Enter OTP"
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
														`OTP sent for ${loginCountryCode} ${COUNTRY_CODE} ${loginPhoneNumber}.`
												);
												return;
											}

											await login(
												loginPhoneNumber,
												loginOtp
											);
											showSuccess(
												'User session started.'
											);
											onLoginSuccess?.();
										} catch (error) {
											showError(
												error instanceof Error
													? error.message
													: 'Unable to complete login.'
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
										? 'Login'
										: 'Generate OTP'}
								</Button>
							</YStack>
						) : (
							<YStack gap="$4">
								<Text fontSize="$8" fontWeight="700">
									User registration
								</Text>
								<Text color="$colorHover">
									Step {registrationStep} of 4
								</Text>

								{registrationStep === 1 ? (
									<YStack gap="$4">
										<Select
											value={selectedLanguage}
											onValueChange={(value) =>
												onLanguageChange(
													value as AppLanguageCode
												)
											}
											options={languageOptions.map(
												(option) => ({
													label: option.label,
													value: option.code
												})
											)}
											placeholder="Select language"
										/>
										<Select
											value={registrationCountryCode}
											onValueChange={
												setRegistrationCountryCode
											}
											options={countrySelectOptions}
											placeholder="Select country"
										/>
										<Input
											placeholder="Mobile number"
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
												placeholder="Validate OTP"
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
																`OTP sent for ${registrationCountryCode} ${COUNTRY_CODE} ${registrationPhoneNumber}.`
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
														'OTP verified. Continue with identity details.'
													);
												} catch (error) {
													showError(
														error instanceof Error
															? error.message
															: 'Unable to validate OTP.'
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
												? 'Validate OTP'
												: 'Generate OTP'}
										</Button>
									</YStack>
								) : null}

								{registrationStep === 2 ? (
									<YStack gap="$4">
										<Input
											placeholder="First name"
											value={firstName}
											onChangeText={setFirstName}
										/>
										<Input
											placeholder="Middle names"
											value={middleNames}
											onChangeText={setMiddleNames}
										/>
										<Input
											placeholder="Last name"
											value={lastName}
											onChangeText={setLastName}
										/>
										<Input
											placeholder="Email address"
											value={email}
											onChangeText={setEmail}
										/>
										<XStack gap="$3">
											<Button
												tone="neutral"
												onPress={() =>
													setRegistrationStep(1)
												}
											>
												Back
											</Button>
											<Button
												onPress={() =>
													setRegistrationStep(3)
												}
												disabled={
													registrationIdentityDisabled
												}
											>
												Continue
											</Button>
										</XStack>
									</YStack>
								) : null}

								{registrationStep === 3 ? (
									<YStack gap="$4">
										<Input
											placeholder="Organisation"
											value={organization}
											onChangeText={setOrganization}
										/>
										<Input
											placeholder="Role title"
											value={roleTitle}
											onChangeText={setRoleTitle}
										/>
										<XStack gap="$3">
											<Button
												tone="neutral"
												onPress={() =>
													setRegistrationStep(2)
												}
											>
												Back
											</Button>
											<Button
												onPress={() =>
													setRegistrationStep(4)
												}
												disabled={
													registrationWorkspaceDisabled
												}
											>
												Review
											</Button>
										</XStack>
									</YStack>
								) : null}

								{registrationStep === 4 ? (
									<YStack gap="$4">
										<Card
											title="Review"
											description="Confirm the details before creating the user profile."
										>
											<YStack gap="$2">
												<Text color="$colorHover">
													Language: {selectedLanguage}
												</Text>
												<Text color="$colorHover">
													Country:{' '}
													{registrationCountryCode}
												</Text>
												<Text color="$colorHover">
													Phone: {COUNTRY_CODE}{' '}
													{registrationPhoneNumber}
												</Text>
												<Text color="$colorHover">
													Name:{' '}
													{[
														firstName,
														middleNames,
														lastName
													]
														.filter(Boolean)
														.join(' ')}
												</Text>
												<Text color="$colorHover">
													Email: {email}
												</Text>
												<Text color="$colorHover">
													Organisation: {organization}
												</Text>
												<Text color="$colorHover">
													Role: {roleTitle}
												</Text>
											</YStack>
										</Card>
										<XStack gap="$3">
											<Button
												tone="neutral"
												onPress={() =>
													setRegistrationStep(3)
												}
											>
												Back
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
															email,
															organization,
															roleTitle
														});
														setActiveTab('login');
														setRegistrationStep(1);
														setRegistrationOtpRequested(
															false
														);
														setRegistrationOtp('');
														showSuccess(
															'Profile created. Use the login tab to continue.'
														);
													} catch (error) {
														showError(
															error instanceof
																Error
																? error.message
																: 'Unable to create the user profile.'
														);
													}
												}}
											>
												Create profile
											</Button>
										</XStack>
									</YStack>
								) : null}
							</YStack>
						)}

						{message ? (
							<Text
								color={
									message.tone === 'error'
										? '$error'
										: '$success'
								}
							>
								{message.text}
							</Text>
						) : null}
					</YStack>
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
	return (
		<XStack gap="$3" flexWrap="wrap" alignItems="flex-start">
			<YStack width={220} flexShrink={0} $sm={{ width: '100%' }}>
				<Select
					value={countryCode}
					onValueChange={onCountryCodeChange}
					options={countrySelectOptions}
					placeholder="Select country"
				/>
			</YStack>
			<YStack flex={1} minWidth={220} $sm={{ width: '100%', flex: 0 }}>
				<Input
					placeholder="Mobile number"
					value={phoneNumber}
					onChangeText={onPhoneNumberChange}
					keyboardType="number-pad"
				/>
			</YStack>
		</XStack>
	);
}

type CountryCodeOption = {
	iso_code: string;
	country_name: string;
};
