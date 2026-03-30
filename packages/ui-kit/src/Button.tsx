import React from 'react';
import { Button as TamaguiButton, GetProps } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

export type ButtonTone = 'primary' | 'secondary' | 'accent' | 'neutral';

type Props = GetProps<typeof TamaguiButton> & {
	tone?: ButtonTone;
};

const filledToneStyles: Record<
	ButtonTone,
	{
		backgroundColor: string;
		color: string;
		hoverBackground: string;
		pressBackground: string;
		borderColor?: string;
		borderWidth?: number;
	}
> = {
	primary: {
		backgroundColor: '$primary',
		color: '$primaryForeground',
		hoverBackground: '$primaryHover',
		pressBackground: '$primaryPress'
	},
	secondary: {
		backgroundColor: '$secondary',
		color: '$secondaryForeground',
		hoverBackground: '$secondaryHover',
		pressBackground: '$secondaryPress'
	},
	accent: {
		backgroundColor: '$accent',
		color: '$accentForeground',
		hoverBackground: '$warning',
		pressBackground: '$warning'
	},
	neutral: {
		backgroundColor: '$backgroundSoft',
		color: '$color',
		hoverBackground: '$backgroundHover',
		pressBackground: '$backgroundPress',
		borderColor: '$borderColor',
		borderWidth: 1
	}
};

function getFilledToneStyles(tone: ButtonTone) {
	switch (tone) {
		case 'secondary': {
			return filledToneStyles.secondary;
		}
		case 'accent': {
			return filledToneStyles.accent;
		}
		case 'neutral': {
			return filledToneStyles.neutral;
		}
		case 'primary':
		default: {
			return filledToneStyles.primary;
		}
	}
}

export function Button({
	tone = 'primary',
	hoverStyle,
	pressStyle,
	focusStyle,
	chromeless,
	...props
}: Props) {
	const toneStyles = getFilledToneStyles(tone);
	const baseStyles = chromeless
		? {
				backgroundColor: 'transparent',
				color: '$color',
				borderWidth: 0,
				hoverStyle: {
					backgroundColor: '$backgroundHover'
				},
				pressStyle: {
					backgroundColor: '$backgroundPress'
				},
				focusStyle: {
					backgroundColor: '$backgroundFocus'
				}
			}
		: {
				backgroundColor: toneStyles.backgroundColor,
				color: toneStyles.color,
				borderColor: toneStyles.borderColor,
				borderWidth: toneStyles.borderWidth,
				hoverStyle: {
					backgroundColor: toneStyles.hoverBackground
				},
				pressStyle: {
					backgroundColor: toneStyles.pressBackground
				},
				focusStyle: {
					borderColor: '$borderColorFocus'
				}
			};

	return (
		<TamaguiButton
			backgroundColor={baseStyles.backgroundColor}
			color={baseStyles.color}
			borderRadius="$4"
			minHeight={controlHeights.default}
			paddingHorizontal={controlPadding.horizontal}
			paddingVertical={controlPadding.vertical}
			fontSize="$3"
			borderColor={baseStyles.borderColor}
			borderWidth={baseStyles.borderWidth}
			chromeless={chromeless}
			hoverStyle={{ ...baseStyles.hoverStyle, ...hoverStyle }}
			pressStyle={{ ...baseStyles.pressStyle, ...pressStyle }}
			focusStyle={{ ...baseStyles.focusStyle, ...focusStyle }}
			{...props}
		/>
	);
}
