import React from 'react';
import { isWeb } from 'tamagui';

type Props = {
	content: React.ReactNode;
	children: React.ReactNode;
};

export function Tooltip({ content, children }: Props) {
	if (!content) {
		return <>{children}</>;
	}

	if (!isWeb) {
		return <>{children}</>;
	}

	return (
		<span
			title={typeof content === 'string' ? content : undefined}
			style={{ display: 'inline-flex' }}
		>
			{children}
		</span>
	);
}
