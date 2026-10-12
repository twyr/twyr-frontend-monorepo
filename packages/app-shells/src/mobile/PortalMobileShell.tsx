import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView } from 'react-native';
import { XStack, YStack, Paragraph } from 'tamagui';
import {
	useMobilePortalExperience,
	useMobileThemeMode
} from '@twyr/app-providers/src/mobile';
import { useTwyrTranslation } from '@twyr/i18n';
import {
	Button,
	LayoutDashboardIcon,
	LayoutSidebarLeftCollapseIcon,
	LayoutSidebarLeftExpandIcon,
	LogoutIcon,
	MobileThemeToggle,
	ProfileIcon,
	Tooltip
} from '@twyr/ui-kit';
import { LanguageMenu } from '../shared/LanguageMenu';

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
	const { themeMode, setThemeMode, resolvedTheme } = useMobileThemeMode();
	const { state, languageOptions, setLanguage, setSidebarCollapsed, logout } =
		useMobilePortalExperience(actor);

	return (
		<YStack flex={1} theme={resolvedTheme} backgroundColor="background">
			<YStack padding="4" gap="4">
				<XStack justifyContent="space-between" alignItems="center">
					<XStack alignItems="center" gap="2">
						{headerBrand ?? null}
						<Tooltip>
							<Tooltip.Trigger asChild>
								<Button
									variant="quiet"
									onPress={() =>
										setSidebarCollapsed(
											!state.sidebarCollapsed
										)
									}
									width={40}
									height={40}
									padding={0}
									backgroundColor={{
										hover: 'transparent',
										press: 'transparent',
										focus: 'transparent'
									}}
									opacity={{
										hover: 0.8,
										press: 0.65,
										focus: 0.8
									}}

									aria-label={
										state.sidebarCollapsed
											? t('common.tooltips.openMenu')
											: t('common.tooltips.collapseMenu')
									}
								>
									{state.sidebarCollapsed ? (
										<LayoutSidebarLeftExpandIcon
											color="currentColor"
											size={18}
										/>
									) : (
										<LayoutSidebarLeftCollapseIcon
											color="currentColor"
											size={18}
										/>
									)}
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<Paragraph>
									{state.sidebarCollapsed
										? t('common.tooltips.openMenu')
										: t('common.tooltips.collapseMenu')}
								</Paragraph>
							</Tooltip.Content>
						</Tooltip>
					</XStack>
					<XStack alignItems="center" gap="2" marginLeft="auto">
						<LanguageMenu
							value={state.language}
							options={languageOptions}
							onChange={setLanguage}
						/>
						<MobileThemeToggle
							value={themeMode}
							onChange={setThemeMode}
						/>
						<Tooltip>
							<Tooltip.Trigger asChild>
								<Button
									variant="quiet"
									onPress={onLogout ?? logout}
									width={48}
									height={40}
									padding={0}
									borderRadius={999}
									aria-label={t('common.tooltips.logout')}
								>
									<LogoutIcon
										color="currentColor"
										size={18}
									/>
								</Button>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<Paragraph>
									{t('common.tooltips.logout')}
								</Paragraph>
							</Tooltip.Content>
						</Tooltip>
					</XStack>
				</XStack>
			</YStack>
			<XStack flex={1} minHeight={0}>
				{!state.sidebarCollapsed ? (
					<YStack
						width={240}
						maxWidth="50%"
						flexShrink={0}
						backgroundColor="backgroundSoft"
						borderRightWidth={1}
						borderColor="border-color"
					>
						<ScrollView>
							<YStack gap="3" padding="2">
								<Tooltip>
									<Tooltip.Trigger asChild>
										<Button
											variant="quiet"
											onPress={() => {
												onNavigate('profile');
												setSidebarCollapsed(true);
											}}
											justifyContent="flex-start"
											icon={<ProfileIcon size={18} />}
										>
											{t('common.actions.profile')}
										</Button>
									</Tooltip.Trigger>
									<Tooltip.Content>
										<Paragraph>
											{t('common.tooltips.profile')}
										</Paragraph>
									</Tooltip.Content>
								</Tooltip>
								<XStack gap="3" flexWrap="wrap">
									<Tooltip>
										<Tooltip.Trigger asChild>
											<Button
												paddingHorizontal="2"
												tone={
													activeRoute === 'dashboard'
														? dashboardTone
														: 'neutral'
												}
												onPress={() => {
													onNavigate('dashboard');
													setSidebarCollapsed(true);
												}}
												icon={
													<LayoutDashboardIcon
														size={18}
													/>
												}
											>
												{t('common.actions.dashboard')}
											</Button>
										</Tooltip.Trigger>
										<Tooltip.Content>
											<Paragraph>
												{t('common.tooltips.dashboard')}
											</Paragraph>
										</Tooltip.Content>
									</Tooltip>
								</XStack>
							</YStack>
						</ScrollView>
					</YStack>
				) : null}
				<YStack flex={1} minWidth={0}>
					{children}
				</YStack>
			</XStack>
		</YStack>
	);
}
