import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import {
	SafeAreaProvider,
	SafeAreaView,
	initialWindowMetrics
} from 'react-native-safe-area-context';
import { XStack, YStack } from 'tamagui';
import {
	useMobilePortalExperience,
	useMobileThemeMode
} from '@twyr/app-providers/src/mobile';
import { useTwyrTranslation } from '@twyr/i18n';
import {
	Button,
	LogoutIcon,
	MobileThemeToggle,
	ProfileIcon
} from '@twyr/ui-kit';
import { LanguageMenu } from '../shared/LanguageMenu';
import { PortalMobileSidebar } from './PortalMobileSidebar';
import { PortalMobileTooltip } from './PortalMobileTooltip';
import { useSidebarBackDismiss } from './useSidebarBackDismiss';

export type PortalMobileShellProps = PropsWithChildren<{
	actor: 'users' | 'system_administrators';
	dashboardTone?: 'primary' | 'accent';
	activeRoute: 'dashboard' | 'profile';
	headerBrand?: ReactNode;
	onNavigate: (route: 'dashboard' | 'profile') => void;
	onLogout?: () => void;
}>;

export function PortalMobileShell({
	actor,
	dashboardTone = 'primary',
	activeRoute,
	headerBrand,
	onNavigate,
	onLogout,
	children
}: PortalMobileShellProps) {
	const { t } = useTwyrTranslation();
	const { width } = useWindowDimensions();
	const { themeMode, setThemeMode, resolvedTheme } = useMobileThemeMode();
	const { state, languageOptions, setLanguage, setSidebarCollapsed, logout } =
		useMobilePortalExperience(actor);
	const compact = width < 660;
	const drawerOpen = compact && !state.sidebarCollapsed;

	useSidebarBackDismiss(state.sidebarCollapsed, setSidebarCollapsed);

	return (
		<YStack
			flex={1}
			minHeight={0}
			theme={resolvedTheme}
			backgroundColor="background"
		>
			<SafeAreaProvider initialMetrics={initialWindowMetrics}>
				<SafeAreaView style={{ flex: 1 }}>
					<XStack
						testID="portal-mobile-topbar"
						minHeight={76}
						flexShrink={0}
						alignItems="center"
						justifyContent="space-between"
						paddingHorizontal="4"
						paddingVertical="2"
						gap="2"
						borderBottomWidth={1}
						borderColor="border-color"
						backgroundColor="background"
						zIndex={30}
					>
						<YStack minWidth={0} flexShrink={1}>
							{headerBrand ?? null}
						</YStack>
						<XStack alignItems="center" gap="2" flexShrink={0}>
							<LanguageMenu
								value={state.language}
								options={languageOptions}
								onChange={setLanguage}
							/>
							<MobileThemeToggle
								value={themeMode}
								onChange={setThemeMode}
							/>
							<PortalMobileTooltip
								label={t('common.tooltips.profile')}
							>
								<Button
									variant="quiet"
									width={44}
									height={44}
									minHeight={44}
									padding={0}
									borderRadius={999}
									aria-label={t('common.tooltips.profile')}
									aria-pressed={activeRoute === 'profile'}
									onPress={() => {
										onNavigate('profile');
										setSidebarCollapsed(true);
									}}
								>
									<ProfileIcon size={20} />
								</Button>
							</PortalMobileTooltip>
							<PortalMobileTooltip
								label={t('common.tooltips.logout')}
							>
								<Button
									variant="quiet"
									onPress={onLogout ?? logout}
									width={44}
									height={44}
									minHeight={44}
									padding={0}
									borderRadius={999}
									aria-label={t('common.tooltips.logout')}
								>
									<LogoutIcon size={18} />
								</Button>
							</PortalMobileTooltip>
						</XStack>
					</XStack>
					<XStack
						flex={1}
						minHeight={0}
						minWidth={0}
						position="relative"
					>
						<YStack
							width={compact || state.sidebarCollapsed ? 64 : 240}
							flexShrink={0}
							zIndex={20}
						>
							<PortalMobileSidebar
								collapsed={state.sidebarCollapsed}
								overlay={drawerOpen}
								activeRoute={activeRoute}
								dashboardTone={dashboardTone}
								onCollapsedChange={setSidebarCollapsed}
								onNavigate={onNavigate}
							/>
						</YStack>
						<YStack
							flex={1}
							minWidth={0}
							minHeight={0}
							accessibilityElementsHidden={drawerOpen}
							importantForAccessibility={
								drawerOpen ? 'no-hide-descendants' : 'auto'
							}
						>
							<ScrollView
								testID="portal-mobile-content"
								style={{ flex: 1 }}
								contentContainerStyle={{ flexGrow: 1 }}
								keyboardShouldPersistTaps="handled"
							>
								{children}
							</ScrollView>
						</YStack>
						{drawerOpen ? (
							<YStack
								testID="portal-mobile-backdrop"
								position="absolute"
								top={0}
								bottom={0}
								left={64}
								right={0}
								zIndex={10}
								backgroundColor="overlay"
								onPress={() => setSidebarCollapsed(true)}
								role="button"
								aria-label={t(
									'common.tooltips.collapseSidebar'
								)}
							/>
						) : null}
					</XStack>
				</SafeAreaView>
			</SafeAreaProvider>
		</YStack>
	);
}
