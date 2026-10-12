import {
	PortalMobileShell,
	type PortalMobileShellProps
} from './PortalMobileShell';

type Props = Omit<PortalMobileShellProps, 'actor' | 'dashboardTone'>;

export function SystemAdministratorMobileShell(props: Props) {
	return (
		<PortalMobileShell
			{...props}
			actor="system_administrators"
			dashboardTone="accent"
		/>
	);
}
