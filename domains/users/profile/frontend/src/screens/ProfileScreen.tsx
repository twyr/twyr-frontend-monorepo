import { useEffect, useState } from 'react';
import type { AppLanguageCode } from '@twyr/core';
import { Card, Input, Button, Select } from '@twyr/ui-kit';
import { Text, XStack, YStack } from 'tamagui';

type LanguageOption = {
	code: string;
	label: string;
};

type ProfileForm = {
	displayName: string;
	email: string;
	phoneNumber: string;
	organization: string;
	roleTitle: string;
};

type Props = {
	profile: ProfileForm;
	language: AppLanguageCode;
	languageOptions: LanguageOption[];
	onLanguageChange: (language: AppLanguageCode) => void;
	onSave: (profile: ProfileForm) => Promise<void>;
};

export function ProfileScreen({
	profile,
	language,
	languageOptions,
	onLanguageChange,
	onSave
}: Props) {
	const [draft, setDraft] = useState(profile);
	const [status, setStatus] = useState<string | null>(null);

	useEffect(() => {
		setDraft(profile);
	}, [profile]);

	return (
		<YStack gap="$5">
			<YStack gap="$2">
				<Text fontSize="$10" fontWeight="700" color="$color">
					User profile
				</Text>
				<Text color="$colorHover">
					Manage the same post-login profile surface exposed from the
					authenticated shell.
				</Text>
			</YStack>

			<Card
				title="Account"
				description="Keep identity, contact, and workspace details current."
			>
				<YStack gap="$4">
					<Input
						placeholder="Display name"
						value={draft.displayName}
						onChangeText={(value) =>
							setDraft((current) => ({
								...current,
								displayName: value
							}))
						}
					/>
					<Input
						placeholder="Email address"
						value={draft.email}
						onChangeText={(value) =>
							setDraft((current) => ({
								...current,
								email: value
							}))
						}
					/>
					<Input
						placeholder="Mobile number"
						value={draft.phoneNumber}
						onChangeText={(value) =>
							setDraft((current) => ({
								...current,
								phoneNumber: value
									.replace(/\D/g, '')
									.slice(0, 10)
							}))
						}
						keyboardType="number-pad"
					/>
					<Input
						placeholder="Organisation"
						value={draft.organization}
						onChangeText={(value) =>
							setDraft((current) => ({
								...current,
								organization: value
							}))
						}
					/>
					<Input
						placeholder="Role title"
						value={draft.roleTitle}
						onChangeText={(value) =>
							setDraft((current) => ({
								...current,
								roleTitle: value
							}))
						}
					/>
					<Select
						value={language}
						onValueChange={(value) =>
							onLanguageChange(value as AppLanguageCode)
						}
						options={languageOptions.map((option) => ({
							label: option.label,
							value: option.code
						}))}
						placeholder="Preferred language"
					/>
					<XStack gap="$3">
						<Button
							tone="primary"
							onPress={async () => {
								await onSave(draft);
								setStatus('Profile updated.');
							}}
						>
							Save changes
						</Button>
					</XStack>
					{status ? <Text color="$success">{status}</Text> : null}
				</YStack>
			</Card>
		</YStack>
	);
}
