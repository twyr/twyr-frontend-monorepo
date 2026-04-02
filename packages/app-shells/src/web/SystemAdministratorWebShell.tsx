'use client';

import Link from 'next/link';
import {
	useEffect,
	useRef,
	useState,
	type PropsWithChildren,
	type ReactNode
} from 'react';
import {
	useWebPortalExperience,
	useWebThemeMode
} from '@twyr/app-providers/src/web';
import { useTwyrTranslation } from '@twyr/i18n';
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
	headerBrand?: ReactNode;
	onLogout?: () => void | Promise<void>;
}>;

export function SystemAdministratorWebShell({
	children,
	headerBrand,
	onLogout
}: Props) {
	const { t } = useTwyrTranslation();
	const { themeMode, setThemeMode } = useWebThemeMode();
	const { state, languageOptions, setLanguage, setSidebarCollapsed, logout } =
		useWebPortalExperience('system_administrators');
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const [hasHydrated, setHasHydrated] = useState(false);

	useEffect(() => {
		setHasHydrated(true);
	}, []);

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

	if (!hasHydrated) {
		return null;
	}

	return (
		<YStack minHeight="100vh" backgroundColor="$background">
			<div
				style={{
					alignItems: 'center',
					background:
						'linear-gradient(to right, rgba(56,189,248,0.05), transparent)',
					backgroundColor: 'var(--background)',
					borderBottom: '1px solid var(--borderColor)',
					display: 'flex',
					justifyContent: 'space-between',
					padding: '8px',
					position: 'sticky',
					top: 0,
					zIndex: 20
				}}
			>
				{headerBrand ? (
					<div>{headerBrand}</div>
				) : (
					<YStack>
						<Text fontSize="$8" fontWeight="700" color="$color">
							{t('adminShell.title')}
						</Text>
						<Text color="$colorHover">
							{t('common.messages.authenticatedWorkspace')}
						</Text>
					</YStack>
				)}
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						gap: '12px'
					}}
				>
					<LanguageMenu
						value={state.language}
						options={languageOptions}
						onChange={setLanguage}
					/>
					<ThemeToggle value={themeMode} onChange={setThemeMode} />
					<Tooltip content={t('common.tooltips.profile')}>
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
								aria-label={t('common.tooltips.profile')}
							>
								<ProfileIcon color="currentColor" size={20} />
							</Button>
						</Link>
					</Tooltip>
					<Tooltip content={t('common.tooltips.logout')}>
						<Button
							chromeless
							onPress={onLogout ?? logout}
							width={48}
							height={40}
							padding={0}
							borderRadius={999}
							aria-label={t('common.tooltips.logout')}
						>
							<LogoutIcon color="currentColor" size={18} />
						</Button>
					</Tooltip>
				</div>
			</div>
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
									? t('common.tooltips.expandSidebar')
									: t('common.tooltips.collapseSidebar')
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
										? t('common.tooltips.expandSidebar')
										: t('common.tooltips.collapseSidebar')
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
							<Tooltip content={t('common.tooltips.dashboard')}>
								<Link
									href="/"
									style={{ textDecoration: 'none' }}
									aria-label={t('common.tooltips.dashboard')}
								>
									<XStack gap="$3" alignItems="center">
										<LayoutDashboardIcon
											color="currentColor"
											size={18}
										/>
										{state.sidebarCollapsed ? null : (
											<Text color="$color">
												{t('common.actions.dashboard')}
											</Text>
										)}
									</XStack>
								</Link>
							</Tooltip>
						</YStack>
					</YStack>
				</div>
				<YStack flex={1} padding="$4" gap="$5">
					{children}
				</YStack>
			</XStack>
		</YStack>
	);
}
