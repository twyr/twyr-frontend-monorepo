import { useEffect } from 'react';

export function useSidebarBackDismiss(
	collapsed: boolean,
	onCollapsedChange: (collapsed: boolean) => void
) {
	useEffect(() => {
		if (collapsed) return;
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onCollapsedChange(true);
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => document.removeEventListener('keydown', handleKeyDown);
	}, [collapsed, onCollapsedChange]);
}
