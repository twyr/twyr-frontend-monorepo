'use client';

import Link from 'next/link';
import { useEffect, useRef, type PropsWithChildren } from 'react';
import {
	useWebPortalExperience,
	useWebThemeMode
} from '@twyr/app-providers/src/web';
import {
	Button,
	LayoutDashboardIcon,
	LayoutSidebarLeftCollapseIcon,
	LayoutSidebarLeftExpandIcon,
	LogoutIcon,
	ProfileIcon,
	ThemeToggle,
	Tooltip
} from '@twyr/ui-kit';
import { Text, XStack, YStack } from 'tamagui';
import { LanguageMenu } from '../shared/LanguageMenu';

type Props = PropsWithChildren<{
	onLogout?: () => void | Promise<void>;
}>;

export function SystemAdministratorWebShell({ children, onLogout }: Props) {
	const { themeMode, setThemeMode } = useWebThemeMode();
	const { state, languageOptions, setLanguage, setSidebarCollapsed, logout } =
		useWebPortalExperience('system_administrators');
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (state.sidebarCollapsed) {
			return;
		}

		const handleInteractionOutside = (event: MouseEvent | FocusEvent) => {
			if (
				event.target instanceof Node &&
				sidebarRef.current?.contains(event.target)
			) {
				return;
			}

			setSidebarCollapsed(true);
		};

		document.addEventListener('mousedown', handleInteractionOutside);
		document.addEventListener('focusin', handleInteractionOutside);

		return () => {
			document.removeEventListener('mousedown', handleInteractionOutside);
			document.removeEventListener('focusin', handleInteractionOutside);
		};
	}, [setSidebarCollapsed, state.sidebarCollapsed]);

	return (
		<YStack minHeight="100vh" backgroundColor="$background">
			<XStack
				padding="$4"
				borderBottomWidth={1}
				borderColor="$borderColor"
				backgroundColor="$background"
				justifyContent="space-between"
				alignItems="center"
				style={{ position: 'sticky', top: 0, zIndex: 20 }}
			>
				<YStack>
					<Text fontSize="$8" fontWeight="700" color="$color">
						System Administrators
					</Text>
					<Text color="$colorHover">Authenticated workspace</Text>
				</YStack>
				<XStack gap="$3" alignItems="center">
					<LanguageMenu
						value={state.language}
						options={languageOptions}
						onChange={setLanguage}
					/>
					<ThemeToggle value={themeMode} onChange={setThemeMode} />
					<Tooltip content="Profile">
						<Link
							href="/profile"
							style={{ textDecoration: 'none' }}
						>
							<Button
								chromeless
								width={48}
								height={40}
								padding={0}
								borderRadius={999}
								aria-label="Profile"
							>
								<ProfileIcon color="currentColor" size={20} />
							</Button>
						</Link>
					</Tooltip>
					<Tooltip content="Logout">
						<Button
							chromeless
							onPress={onLogout ?? logout}
							width={48}
							height={40}
							padding={0}
							borderRadius={999}
							aria-label="Logout"
						>
							<LogoutIcon color="currentColor" size={18} />
						</Button>
					</Tooltip>
				</XStack>
			</XStack>
			<XStack flex={1}>
				<div
					ref={sidebarRef}
					tabIndex={-1}
					onMouseLeave={() => setSidebarCollapsed(true)}
					style={{ height: 'auto' }}
				>
					<YStack
						width={state.sidebarCollapsed ? 68 : 300}
						padding="$4"
						gap="$4"
						borderRightWidth={1}
						borderColor="$borderColor"
						backgroundColor="$backgroundSoft"
						minHeight="100%"
					>
						<Tooltip
							content={
								state.sidebarCollapsed
									? 'Expand sidebar'
									: 'Collapse sidebar'
							}
						>
							<Button
								chromeless
								onPress={() =>
									setSidebarCollapsed(!state.sidebarCollapsed)
								}
								justifyContent="flex-start"
								alignItems="center"
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
										? 'Expand sidebar'
										: 'Collapse sidebar'
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
						<YStack gap="$2">
							<Tooltip content="Dashboard">
								<Link
									href="/"
									style={{ textDecoration: 'none' }}
									aria-label="Dashboard"
								>
									<XStack gap="$3" alignItems="center">
										<LayoutDashboardIcon
											color="currentColor"
											size={18}
										/>
										{state.sidebarCollapsed ? null : (
											<Text color="$color">
												Dashboard
											</Text>
										)}
									</XStack>
								</Link>
							</Tooltip>
						</YStack>
					</YStack>
				</div>
				<YStack flex={1} padding="$5" gap="$5">
					{children}
				</YStack>
			</XStack>
		</YStack>
	);
}
