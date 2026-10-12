import { surfaceElevations } from '@twyr/design-system';
import { Card as TamaguiCard, styled, withStaticProperties } from 'tamagui';

export const Card = withStaticProperties(
	styled(TamaguiCard, {
		displayName: 'TwyrCard',
		size: false,
		backgroundColor: 'background',
		borderColor: 'border-color',
		borderWidth: 1,
		borderRadius: '5',
		padding: '4',
		gap: '3',
		...surfaceElevations.sm
	}),
	{
		Header: styled(TamaguiCard.Header, {
			displayName: 'TwyrCardHeader',
			size: false,
			padding: 0,
			gap: '3',
			marginBottom: 0
		}),
		Footer: styled(TamaguiCard.Footer, {
			displayName: 'TwyrCardFooter',
			size: false,
			padding: 0,
			justifyContent: 'flex-end'
		})
	}
);
