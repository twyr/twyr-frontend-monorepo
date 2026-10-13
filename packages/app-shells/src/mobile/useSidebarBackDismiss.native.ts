import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useSidebarBackDismiss(
	collapsed: boolean,
	onCollapsedChange: (collapsed: boolean) => void
) {
	useEffect(() => {
		if (collapsed) return;
		const subscription = BackHandler.addEventListener(
			'hardwareBackPress',
			() => {
				onCollapsedChange(true);
				return true;
			}
		);
		return () => subscription.remove();
	}, [collapsed, onCollapsedChange]);
}
