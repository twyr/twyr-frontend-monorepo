import { Button as TamaguiButton, styled } from 'tamagui';
import { controlHeights, controlPadding } from './ControlStyles';

export type ButtonTone = 'primary' | 'secondary' | 'accent' | 'neutral';

export const Button = styled(TamaguiButton, {
	displayName: 'TwyrButton',
	size: false,
	borderRadius: '4',
	minHeight: controlHeights.default,
	paddingHorizontal: controlPadding.horizontal,
	paddingVertical: controlPadding.vertical,
	fontSize: '3',
	lineHeight: '3',
	borderWidth: 1,
	borderColor: 'transparent focus:border-color-focus',
	outlineColor: 'focus-visible:border-color-focus',
	variants: {
		tone: {
			primary: {
				backgroundColor:
					'primary hover:primaryHover press:primaryPress',
				color: 'primaryForeground'
			},
			secondary: {
				backgroundColor:
					'secondary hover:secondaryHover press:secondaryPress',
				color: 'secondaryForeground'
			},
			accent: {
				backgroundColor: 'accent hover:warning press:warning',
				color: 'accentForeground'
			},
			neutral: {
				backgroundColor:
					'backgroundSoft hover:background-hover press:background-press',
				color: 'color',
				borderColor: 'border-color focus:border-color-focus'
			}
		},
		variant: {
			quiet: {
				backgroundColor:
					'transparent hover:background-hover press:background-press focus:background-focus',
				color: 'color',
				borderWidth: 0
			}
		}
	} as const,
	defaultVariants: {
		tone: 'primary'
	}
});
