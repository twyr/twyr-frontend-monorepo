import React from 'react';
import { Avatar as TamaguiAvatar } from 'tamagui';

type Props = {
	name: string;
	src?: string;
	size?: number;
};

export function Avatar({ name, src, size = 40 }: Props) {
	const fallback = name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

	return (
		<TamaguiAvatar circular size={size}>
			{src ? (
				<TamaguiAvatar.Image accessibilityLabel={name} src={src} />
			) : null}
			<TamaguiAvatar.Fallback
				backgroundColor="$primary"
				justifyContent="center"
				alignItems="center"
			>
				{fallback}
			</TamaguiAvatar.Fallback>
		</TamaguiAvatar>
	);
}
