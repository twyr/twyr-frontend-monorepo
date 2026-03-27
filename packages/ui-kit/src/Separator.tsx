import React from 'react';
import { Separator as TamaguiSeparator } from 'tamagui';

type Props = { vertical?: boolean };

export function Separator({ vertical = false }: Props) {
	return <TamaguiSeparator vertical={vertical} borderColor="$borderColor" />;
}
