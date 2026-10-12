import {
	PortalMobileShell,
	type PortalMobileShellProps
} from './PortalMobileShell';

type Props = Omit<PortalMobileShellProps, 'actor' | 'dashboardTone'>;

export function UserMobileShell(props: Props) {
	return (
		<PortalMobileShell {...props} actor="users" dashboardTone="primary" />
	);
}
