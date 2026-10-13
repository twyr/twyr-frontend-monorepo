import { ScrollView } from 'react-native';
import { getVariableValue, Text, useTheme, XStack, YStack } from 'tamagui';
import { useTwyrTranslation } from '@twyr/i18n';
import {
	Button,
	LayoutDashboardIcon,
	LayoutSidebarLeftCollapseIcon,
	LayoutSidebarLeftExpandIcon
} from '@twyr/ui-kit';
import { PortalMobileTooltip } from './PortalMobileTooltip';

type Props = {
	collapsed: boolean;
	overlay: boolean;
	activeRoute: 'dashboard' | 'profile';
	dashboardTone: 'primary' | 'accent';
	onCollapsedChange: (collapsed: boolean) => void;
	onNavigate: (route: 'dashboard' | 'profile') => void;
};

export function PortalMobileSidebar({
	collapsed,
	overlay,
	activeRoute,
	dashboardTone,
	onCollapsedChange,
	onNavigate
}: Props) {
	const { t } = useTwyrTranslation();
	const theme = useTheme();
	const iconColor = getVariableValue(
		activeRoute === 'dashboard'
			? dashboardTone === 'primary'
				? theme.primaryForeground
				: theme.accentForeground
			: theme.color
	);
	const toggleLabel = collapsed
		? t('common.tooltips.expandSidebar')
		: t('common.tooltips.collapseSidebar');

	return (
		<YStack
			testID="portal-mobile-sidebar"
			position={overlay ? 'absolute' : 'relative'}
			top={0}
			bottom={0}
			left={0}
			width={collapsed ? 64 : 240}
			flex={1}
			minHeight={0}
			backgroundColor="backgroundSoft"
			borderRightWidth={1}
			borderColor="border-color"
		>
			<ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
				<YStack paddingVertical="4" paddingHorizontal={9} gap="3">
					<PortalMobileTooltip label={toggleLabel} placement="right">
						<Button
							variant="quiet"
							onPress={() => onCollapsedChange(!collapsed)}
							width={32}
							height={32}
							minHeight={32}
							marginLeft={6}
							padding={0}
							hitSlop={6}
							borderRadius="1"
							borderWidth={1}
							borderColor="border-color"
							aria-label={toggleLabel}
							aria-expanded={!collapsed}
						>
							{collapsed ? (
								<LayoutSidebarLeftExpandIcon size={18} />
							) : (
								<LayoutSidebarLeftCollapseIcon size={18} />
							)}
						</Button>
					</PortalMobileTooltip>
					<PortalMobileTooltip
						label={t('common.tooltips.dashboard')}
						placement="right"
						disabled={!collapsed}
					>
						<Button
							variant={
								activeRoute === 'dashboard'
									? undefined
									: 'quiet'
							}
							tone={dashboardTone}
							width="100%"
							height={44}
							minHeight={44}
							padding={0}
							borderRadius="2"
							justifyContent="flex-start"
							aria-label={t('common.tooltips.dashboard')}
							aria-pressed={activeRoute === 'dashboard'}
							onPress={() => {
								onNavigate('dashboard');
								onCollapsedChange(true);
							}}
						>
							<XStack
								width={44}
								flexShrink={0}
								justifyContent="center"
							>
								<LayoutDashboardIcon
									size={18}
									color={iconColor}
								/>
							</XStack>
							{collapsed ? null : (
								<Text
									fontSize="2"
									marginLeft="2"
									color={
										activeRoute === 'dashboard'
											? `${dashboardTone}Foreground`
											: 'color'
									}
								>
									{t('common.actions.dashboard')}
								</Text>
							)}
						</Button>
					</PortalMobileTooltip>
				</YStack>
			</ScrollView>
		</YStack>
	);
}
