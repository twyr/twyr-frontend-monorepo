'use client';

import { PortalWebShell, type PortalWebShellProps } from './PortalWebShell';

export function UserWebShell(props: PortalWebShellProps) {
	return <PortalWebShell {...props} actor="users" />;
}
