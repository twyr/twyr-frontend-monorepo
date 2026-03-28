import { SafeAreaView } from 'react-native';
import { H2, Paragraph, XStack, YStack } from 'tamagui';
import {
	TwyrMobileProviders,
	useMobileThemeMode
} from '@twyr/app-providers/src/mobile';
import {
	ArrowRightIcon,
	BoltIcon,
	Button,
	Card,
	Input,
	LayoutDashboardIcon,
	MobileThemeToggle,
	ShieldCheckIcon
} from '@twyr/ui-kit';

export default function App() {
	return (
		<TwyrMobileProviders>
			<MobileShellScreen />
		</TwyrMobileProviders>
	);
}

function MobileShellScreen() {
	const { themeMode, setThemeMode } = useMobileThemeMode();

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<YStack
				flex={1}
				backgroundColor="$background"
				padding="$6"
				gap="$5"
			>
				<XStack
					justifyContent="space-between"
					alignItems="flex-start"
					gap="$4"
					flexWrap="wrap"
				>
					<YStack gap="$2" flex={1} minWidth={220}>
						<Paragraph
							color="$accent"
							fontWeight="700"
							textTransform="uppercase"
						>
							Twyr mobile shell
						</Paragraph>
						<H2 color="$color">High-end starter experience</H2>
						<Paragraph color="$colorMuted">
							Tamagui is now mounted at the app root and consuming
							the same design tokens as web.
						</Paragraph>
					</YStack>

					<MobileThemeToggle
						value={themeMode}
						onChange={setThemeMode}
					/>
				</XStack>

				<Card>
					<YStack gap="$4">
						<Input
							placeholder="Mobile number"
							keyboardType="phone-pad"
						/>
						<Button iconAfter={ArrowRightIcon}>Continue</Button>
					</YStack>
				</Card>

				<Card>
					<YStack gap="$3">
						<Paragraph color="$color" fontWeight="700" size="$6">
							Ready surfaces
						</Paragraph>
						<XStack alignItems="center" gap="$3">
							<ShieldCheckIcon color="$accent" size={18} />
							<Paragraph color="$colorMuted">
								Trust-first onboarding flows
							</Paragraph>
						</XStack>
						<XStack alignItems="center" gap="$3">
							<LayoutDashboardIcon color="$accent" size={18} />
							<Paragraph color="$colorMuted">
								Shared primitives across screens
							</Paragraph>
						</XStack>
						<XStack alignItems="center" gap="$3">
							<BoltIcon color="$accent" size={18} />
							<Paragraph color="$colorMuted">
								Fast shell composition for mobile
							</Paragraph>
						</XStack>
					</YStack>
				</Card>
			</YStack>
		</SafeAreaView>
	);
}
