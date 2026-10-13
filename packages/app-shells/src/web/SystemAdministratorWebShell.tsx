'use client';

import { PortalWebShell, type PortalWebShellProps } from './PortalWebShell';

export function SystemAdministratorWebShell(props: PortalWebShellProps) {
	return <PortalWebShell {...props} actor="system_administrators" />;
}
