import { SafeAreaView } from 'react-native';
import { TamaguiProvider, Theme, H2, Paragraph, YStack } from 'tamagui';
import { tamaguiConfig } from '@twyr/design-system';
import { Button, Card, Input } from '@twyr/ui-kit';

export default function App() {
	return (
		<TamaguiProvider config={tamaguiConfig} defaultTheme="light">
			<Theme name="light">
				<SafeAreaView style={{ flex: 1 }}>
					<YStack
						flex={1}
						backgroundColor="$background"
						padding="$6"
						gap="$5"
					>
						<YStack gap="$2">
							<Paragraph
								color="$accent"
								fontWeight="700"
								textTransform="uppercase"
							>
								Twyr mobile shell
							</Paragraph>
							<H2 color="$color">High-end starter experience</H2>
							<Paragraph color="$colorMuted">
								Tamagui is now mounted at the app root and
								consuming the same design tokens as web.
							</Paragraph>
						</YStack>

						<Card>
							<YStack gap="$4">
								<Input
									placeholder="Mobile number"
									keyboardType="phone-pad"
								/>
								<Button>Continue</Button>
							</YStack>
						</Card>
					</YStack>
				</SafeAreaView>
			</Theme>
		</TamaguiProvider>
	);
}
