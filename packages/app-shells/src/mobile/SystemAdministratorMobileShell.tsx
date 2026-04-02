import type { PropsWithChildren, ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { XStack, YStack } from 'tamagui';
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

type Props = PropsWithChildren<{
	activeRoute: 'dashboard' | 'profile';
	headerBrand?: ReactNode;
	onNavigate: (route: 'dashboard' | 'profile') => void;
	onLogout?: () => void;
}>;

export function SystemAdministratorMobileShell({
	activeRoute,
	headerBrand,
	onNavigate,
	onLogout,
	children
}: Props) {
	const { t } = useTwyrTranslation();
	const { themeMode, setThemeMode, resolvedTheme } = useMobileThemeMode();
	const { state, languageOptions, setLanguage, setSidebarCollapsed, logout } =
		useMobilePortalExperience('system_administrators');

	return (
		<YStack flex={1} theme={resolvedTheme} backgroundColor="$background">
			<YStack padding="$4" gap="$4">
				<XStack justifyContent="space-between" alignItems="center">
					<XStack alignItems="center" gap="$2">
						<Tooltip
							content={
								state.sidebarCollapsed
									? t('common.tooltips.openMenu')
									: t('common.tooltips.collapseMenu')
							}
						>
							<Button
								chromeless
								onPress={() =>
									setSidebarCollapsed(!state.sidebarCollapsed)
								}
								width={40}
								height={40}
								padding={0}
								hoverStyle={{
									backgroundColor: 'transparent',
									opacity: 0.8
								}}
								pressStyle={{
									backgroundColor: 'transparent',
									opacity: 0.65
								}}
								focusStyle={{
									backgroundColor: 'transparent',
									opacity: 0.8
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
						</Tooltip>
						{headerBrand ?? null}
					</XStack>
					<MobileThemeToggle
						value={themeMode}
						onChange={setThemeMode}
					/>
				</XStack>
				{!state.sidebarCollapsed ? (
					<YStack position="relative">
						<Pressable
							accessibilityLabel={t(
								'common.tooltips.collapseMenu'
							)}
							onPress={() => setSidebarCollapsed(true)}
							style={StyleSheet.absoluteFillObject}
						/>
						<CardLikeMenu>
							<YStack gap="$3">
								<Tooltip content={t('common.tooltips.profile')}>
									<Button
										chromeless
										onPress={() => {
											onNavigate('profile');
											setSidebarCollapsed(true);
										}}
										justifyContent="flex-start"
										icon={<ProfileIcon size={18} />}
									>
										{t('common.actions.profile')}
									</Button>
								</Tooltip>
								<LanguageMenu
									value={state.language}
									options={languageOptions}
									onChange={setLanguage}
								/>
								<XStack gap="$3" flexWrap="wrap">
									<Tooltip
										content={t('common.tooltips.dashboard')}
									>
										<Button
											tone={
												activeRoute === 'dashboard'
													? 'accent'
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
									</Tooltip>
									<Tooltip
										content={t('common.tooltips.logout')}
									>
										<Button
											chromeless
											onPress={onLogout ?? logout}
											width={48}
											height={40}
											padding={0}
											borderRadius={999}
											hoverStyle={{
												backgroundColor: 'transparent',
												opacity: 0.8
											}}
											pressStyle={{
												backgroundColor: 'transparent',
												opacity: 0.65
											}}
											focusStyle={{
												backgroundColor: 'transparent',
												opacity: 0.8
											}}
											aria-label={t(
												'common.tooltips.logout'
											)}
										>
											<LogoutIcon
												color="currentColor"
												size={18}
											/>
										</Button>
									</Tooltip>
								</XStack>
							</YStack>
						</CardLikeMenu>
					</YStack>
				) : null}
			</YStack>
			<YStack flex={1}>{children}</YStack>
		</YStack>
	);
}

function CardLikeMenu({ children }: PropsWithChildren) {
	return (
		<YStack
			padding="$4"
			borderWidth={1}
			borderColor="$borderColor"
			borderRadius="$5"
			backgroundColor="$backgroundSoft"
		>
			{children}
		</YStack>
	);
}
