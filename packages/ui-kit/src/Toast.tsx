import React from 'react';
import {
	ToastViewport as TamaguiToastViewport,
	useToastController
} from '@tamagui/toast';
import { Button } from './Button';

export function ToastViewport() {
	return <TamaguiToastViewport top="$8" right="$4" />;
}

type TriggerProps = {
	title: string;
	message?: string;
	children?: React.ReactNode;
};

export function ToastTrigger({ title, message, children }: TriggerProps) {
	const toast = useToastController();

	return (
		<Button onPress={() => toast.show(title, { message })}>
			{children ?? 'Show toast'}
		</Button>
	);
}
