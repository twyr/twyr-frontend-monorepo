import React from 'react';
import {
	Toast as TamaguiToast,
	ToastViewport as TamaguiToastViewport,
	useToastController,
	useToastState
} from '@tamagui/toast';
import { Button } from './Button';

export function ToastViewport() {
	const currentToast = useToastState();
	const toast = useToastController();

	return (
		<>
			<TamaguiToastViewport top="$8" right="$4" />
			{currentToast && !currentToast.isHandledNatively ? (
				<TamaguiToast
					key={currentToast.id}
					duration={currentToast.duration}
					viewportName={currentToast.viewportName}
					onOpenChange={(open) => {
						if (!open) {
							toast.hide();
						}
					}}
				>
					<TamaguiToast.Title>
						{currentToast.title}
					</TamaguiToast.Title>
					{currentToast.message ? (
						<TamaguiToast.Description>
							{currentToast.message}
						</TamaguiToast.Description>
					) : null}
				</TamaguiToast>
			) : null}
		</>
	);
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
