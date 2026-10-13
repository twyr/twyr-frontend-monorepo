'use client';

import Link from 'next/link';
import {
	useEffect,
	useState,
	type PropsWithChildren,
	type ReactNode
} from 'react';
import { Text, XStack, YStack } from 'tamagui';
import {
	useWebPortalExperience,
	useWebThemeMode
} from '@twyr/app-providers/src/web';
import { useTwyrTranslation } from '@twyr/i18n';
import { Button, LogoutIcon, ProfileIcon, ThemeToggle } from '@twyr/ui-kit';
import { LanguageMenu } from '../shared/LanguageMenu';
import { PortalWebSidebar } from './PortalWebSidebar';
import { PortalWebTooltip } from './PortalWebTooltip';

export type PortalWebShellProps = PropsWithChildren<{
	headerBrand?: ReactNode;
	onLogout?: () => void | Promise<void>;
}>;

type Props = PortalWebShellProps & {
	actor: 'users' | 'system_administrators';
};

export function PortalWebShell({
	actor,
	children,
	headerBrand,
	onLogout
}: Props) {
	const { t } = useTwyrTranslation();
	const { themeMode, setThemeMode } = useWebThemeMode();
	const { state, languageOptions, setLanguage, setSidebarCollapsed, logout } =
		useWebPortalExperience(actor);
	const [hasHydrated, setHasHydrated] = useState(false);

	useEffect(() => {
		setHasHydrated(true);
	}, []);

	if (!hasHydrated) return null;

	return (
		<YStack height="100dvh" overflow="hidden" backgroundColor="background">
			<XStack
				render="header"
				minHeight={76}
				flexShrink={0}
				alignItems="center"
				justifyContent="space-between"
				gap="4"
				paddingVertical="2"
				borderBottomWidth={1}
				borderColor="border-color"
				backgroundColor="background"
				zIndex={20}
				style={{
					paddingInline: 'clamp(16px, 5vw, 64px)'
				}}
			>
				<YStack minWidth={0} justifyContent="center">
					{headerBrand ?? (
						<YStack>
							<Text fontSize="5" fontWeight="700" color="color">
								{t(
									actor === 'users'
										? 'userShell.title'
										: 'adminShell.title'
								)}
							</Text>
							<Text fontSize="2" color="color-hover">
								{t('common.messages.authenticatedWorkspace')}
							</Text>
						</YStack>
					)}
				</YStack>
				<XStack alignItems="center" flexShrink={0} gap="2">
					<LanguageMenu
						value={state.language}
						options={languageOptions}
						onChange={setLanguage}
					/>
					<ThemeToggle value={themeMode} onChange={setThemeMode} />
					<PortalWebTooltip label={t('common.tooltips.profile')}>
						<Link
							href="/profile"
							aria-label={t('common.tooltips.profile')}
							style={{
								textDecoration: 'none',
								color: 'var(--color)',
								display: 'flex'
							}}
						>
							<XStack
								width={40}
								height={40}
								alignItems="center"
								justifyContent="center"
								borderRadius={999}
								backgroundColor="transparent hover:background-hover press:background-press"
							>
								<ProfileIcon size={20} />
							</XStack>
						</Link>
					</PortalWebTooltip>
					<PortalWebTooltip label={t('common.tooltips.logout')}>
						<Button
							variant="quiet"
							onPress={onLogout ?? logout}
							width={40}
							height={40}
							minHeight={40}
							padding={0}
							borderRadius={999}
							aria-label={t('common.tooltips.logout')}
						>
							<LogoutIcon size={18} />
						</Button>
					</PortalWebTooltip>
				</XStack>
			</XStack>
			<XStack flex={1} minHeight={0} minWidth={0}>
				<PortalWebSidebar
					collapsed={state.sidebarCollapsed}
					onCollapsedChange={setSidebarCollapsed}
				/>
				<YStack
					render="main"
					flex={1}
					minWidth={0}
					minHeight={0}
					overflow="auto"
					padding="4"
					gap="5"
				>
					{children}
				</YStack>
			</XStack>
		</YStack>
	);
}
