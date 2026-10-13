import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Text, XStack, YStack, type TamaguiElement } from 'tamagui';
import { useTwyrTranslation } from '@twyr/i18n';
import {
	Button,
	LayoutDashboardIcon,
	LayoutSidebarLeftCollapseIcon,
	LayoutSidebarLeftExpandIcon
} from '@twyr/ui-kit';
import { PortalWebTooltip } from './PortalWebTooltip';

type Props = {
	collapsed: boolean;
	onCollapsedChange: (collapsed: boolean) => void;
};

export function PortalWebSidebar({ collapsed, onCollapsedChange }: Props) {
	const { t } = useTwyrTranslation();
	const pathname = usePathname();
	const sidebarRef = useRef<HTMLElement | null>(null);
	const toggleRef = useRef<TamaguiElement | null>(null);
	const toggleLabel = collapsed
		? t('common.tooltips.expandSidebar')
		: t('common.tooltips.collapseSidebar');
	const dashboardActive = pathname === '/';

	useEffect(() => {
		if (collapsed) return;

		const handleInteractionOutside = (event: MouseEvent | FocusEvent) => {
			if (
				event.target instanceof Node &&
				!sidebarRef.current?.contains(event.target)
			) {
				onCollapsedChange(true);
			}
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onCollapsedChange(true);
				toggleRef.current?.focus();
			}
		};

		document.addEventListener('mousedown', handleInteractionOutside);
		document.addEventListener('focusin', handleInteractionOutside);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleInteractionOutside);
			document.removeEventListener('focusin', handleInteractionOutside);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [collapsed, onCollapsedChange]);

	return (
		<aside
			ref={sidebarRef}
			style={{
				display: 'flex',
				flexShrink: 0,
				width: collapsed ? 64 : 240
			}}
		>
			<YStack
				flex={1}
				minHeight={0}
				paddingVertical="4"
				paddingHorizontal={13}
				gap="3"
				borderRightWidth={1}
				borderColor="border-color"
				backgroundColor="backgroundSoft"
				overflow="auto"
			>
				<PortalWebTooltip label={toggleLabel} placement="right">
					<Button
						ref={toggleRef}
						variant="quiet"
						onPress={() => onCollapsedChange(!collapsed)}
						width={32}
						height={32}
						minHeight={32}
						marginLeft={2}
						padding={0}
						borderRadius="1"
						borderWidth={1}
						borderColor="border-color"
						aria-label={toggleLabel}
						aria-expanded={!collapsed}
						aria-controls="portal-navigation"
					>
						{collapsed ? (
							<LayoutSidebarLeftExpandIcon size={18} />
						) : (
							<LayoutSidebarLeftCollapseIcon size={18} />
						)}
					</Button>
				</PortalWebTooltip>
				<YStack render="nav" id="portal-navigation" gap="2">
					<PortalWebTooltip
						label={t('common.tooltips.dashboard')}
						placement="right"
						disabled={!collapsed}
					>
						<Link
							href="/"
							aria-label={t('common.tooltips.dashboard')}
							aria-current={dashboardActive ? 'page' : undefined}
							onClick={() => onCollapsedChange(true)}
							style={{
								textDecoration: 'none',
								color: 'var(--color)',
								display: 'block'
							}}
						>
							<XStack
								height={36}
								alignItems="center"
								borderRadius="2"
								backgroundColor={
									dashboardActive
										? 'background-focus hover:background-hover press:background-press'
										: 'transparent hover:background-hover press:background-press'
								}
							>
								<XStack
									width={36}
									flexShrink={0}
									justifyContent="center"
								>
									<LayoutDashboardIcon size={18} />
								</XStack>
								{collapsed ? null : (
									<Text
										color="color"
										fontSize="2"
										marginLeft="2"
									>
										{t('common.actions.dashboard')}
									</Text>
								)}
							</XStack>
						</Link>
					</PortalWebTooltip>
				</YStack>
			</YStack>
		</aside>
	);
}
