import type { PropsWithChildren } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { XStack, YStack } from 'tamagui';
import {
	useMobilePortalExperience,
	useMobileThemeMode
} from '@twyr/app-providers/src/mobile';
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
	onNavigate: (route: 'dashboard' | 'profile') => void;
	onLogout?: () => void;
}>;

export function UserMobileShell({
	activeRoute,
	onNavigate,
	onLogout,
	children
}: Props) {
	const { themeMode, setThemeMode, resolvedTheme } = useMobileThemeMode();
	const { state, languageOptions, setLanguage, setSidebarCollapsed, logout } =
		useMobilePortalExperience('users');

	return (
		<YStack flex={1} theme={resolvedTheme} backgroundColor="$background">
			<YStack padding="$4" gap="$4">
				<XStack justifyContent="space-between" alignItems="center">
					<Tooltip
						content={
							state.sidebarCollapsed
								? 'Open menu'
								: 'Collapse menu'
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
									? 'Open menu'
									: 'Collapse menu'
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
					<MobileThemeToggle
						value={themeMode}
						onChange={setThemeMode}
					/>
				</XStack>
				{!state.sidebarCollapsed ? (
					<YStack position="relative">
						<Pressable
							accessibilityLabel="Collapse menu"
							onPress={() => setSidebarCollapsed(true)}
							style={StyleSheet.absoluteFillObject}
						/>
						<CardLikeMenu>
							<YStack gap="$3">
								<Tooltip content="Profile">
									<Button
										chromeless
										onPress={() => {
											onNavigate('profile');
											setSidebarCollapsed(true);
										}}
										justifyContent="flex-start"
										icon={<ProfileIcon size={18} />}
									>
										Profile
									</Button>
								</Tooltip>
								<LanguageMenu
									value={state.language}
									options={languageOptions}
									onChange={setLanguage}
								/>
								<XStack gap="$3">
									<Tooltip content="Dashboard">
										<Button
											tone={
												activeRoute === 'dashboard'
													? 'primary'
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
											Dashboard
										</Button>
									</Tooltip>
									<Tooltip content="Logout">
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
											aria-label="Logout"
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
