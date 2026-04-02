import { type ReactNode, useEffect, useMemo, useState } from 'react';
import {
	fetchCountryCodeOptions,
	formatCountryCodeOptionLabel,
	getDefaultCountryCodeValue,
	type AppLanguageCode,
	type CountryCodeOption
} from '@twyr/core';
import { useLocalizedPageRequests } from '@twyr/app-providers/src/page-requests';
import { useTwyrTranslation } from '@twyr/i18n';
import { Button, Card, Input, Select } from '@twyr/ui-kit';
import { Text, XStack, YStack } from 'tamagui';

type LanguageOption = {
	code: string;
	label: string;
};

type Props = {
	selectedLanguage: AppLanguageCode;
	languageOptions: LanguageOption[];
	countryOptionsEndpoint: string;
	requestOtp: (phoneNumber: string) => Promise<string>;
	login: (phoneNumber: string, otp: string) => Promise<void>;
	onLanguageChange: (language: AppLanguageCode) => void;
	onLoginSuccess?: () => void;
	headerLogo?: ReactNode;
};

type MessageTone = 'error' | 'success';

export function LoginScreen({
	selectedLanguage,
	languageOptions,
	countryOptionsEndpoint,
	requestOtp,
	login,
	onLanguageChange,
	onLoginSuccess,
	headerLogo
}: Props) {
	const { t } = useTwyrTranslation();
	const { runRequest, unregisterRequest } =
		useLocalizedPageRequests(selectedLanguage);
	const [loginPhoneNumber, setLoginPhoneNumber] = useState('');
	const [loginOtp, setLoginOtp] = useState('');
	const [loginOtpRequested, setLoginOtpRequested] = useState(false);
	const [countryOptions, setCountryOptions] = useState<CountryCodeOption[]>(
		[]
	);
	const [loginCountryCode, setLoginCountryCode] = useState('IN');
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
	const countrySelectOptions = useMemo(
		() =>
			countryOptions.map((option) => ({
				label: formatCountryCodeOptionLabel(option),
				value: option.iso_code
			})),
		[countryOptions]
	);

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
			setLoginCountryCode(getDefaultCountryCodeValue(options));
		});

		return () => {
			cancelled = true;
			unregisterRequest('country-codes');
		};
	}, [countryOptionsEndpoint, runRequest, unregisterRequest]);

	return (
		<YStack flex={1} justifyContent="center" padding="$5">
			<YStack maxWidth={760} width="100%" alignSelf="center" gap="$5">
				<Card>
					<YStack gap="$3">
						<XStack
							alignItems="center"
							backgroundColor="rgba(2, 6, 23, 0.7)"
							borderBottomColor="rgba(255, 255, 255, 0.05)"
							borderBottomWidth={1}
							borderRadius="$3"
							flexWrap="wrap"
							gap="$3"
							justifyContent="space-between"
							paddingHorizontal="$3"
							paddingVertical="$2"
						>
							{headerLogo ?? null}
							<Button tone="primary" onPress={resetMessage}>
								{t('common.actions.login')}
							</Button>
						</XStack>

						<YStack gap="$4">
							<Select
								value={selectedLanguage}
								onValueChange={(value) =>
									onLanguageChange(value as AppLanguageCode)
								}
								options={languageOptions.map((option) => ({
									label: option.label,
									value: option.code
								}))}
								placeholder={t('common.placeholders.language')}
							/>
							<PhoneNumberRow
								countryCode={loginCountryCode}
								onCountryCodeChange={setLoginCountryCode}
								countrySelectOptions={countrySelectOptions}
								phoneNumber={loginPhoneNumber}
								onPhoneNumberChange={(value) => {
									setLoginPhoneNumber(
										value.replace(/\D/g, '').slice(0, 10)
									);
									setLoginOtpRequested(false);
									setLoginOtp('');
									resetMessage();
								}}
							/>
							{loginOtpRequested ? (
								<Input
									placeholder={t('common.placeholders.otp')}
									value={loginOtp}
									onChangeText={(value) => {
										setLoginOtp(
											value.replace(/\D/g, '').slice(0, 4)
										);
										resetMessage();
									}}
									keyboardType="number-pad"
								/>
							) : null}
							<Button
								tone="accent"
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
													t('adminLogin.otpSent', {
														countryCode:
															loginCountryCode,
														phoneNumber:
															loginPhoneNumber
													})
											);
											return;
										}

										await login(loginPhoneNumber, loginOtp);
										showSuccess(
											t('adminLogin.sessionStarted')
										);
										onLoginSuccess?.();
									} catch (error) {
										showError(
											error instanceof Error
												? error.message
												: t('adminLogin.loginFailed')
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
						</YStack>

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
	const { t } = useTwyrTranslation();
	return (
		<YStack gap="$3" width="100%">
			<YStack width="100%">
				<Select
					value={countryCode}
					onValueChange={onCountryCodeChange}
					options={countrySelectOptions}
					placeholder={t('common.placeholders.country')}
				/>
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
