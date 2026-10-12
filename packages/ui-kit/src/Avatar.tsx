import { Avatar as TamaguiAvatar, styled, withStaticProperties } from 'tamagui';

export const Avatar = withStaticProperties(
	styled(TamaguiAvatar, {
		displayName: 'TwyrAvatar',
		borderRadius: 999,
		overflow: 'hidden'
	}),
	{
		Fallback: styled(TamaguiAvatar.Fallback, {
			displayName: 'TwyrAvatarFallback',
			backgroundColor: 'primary',
			justifyContent: 'center',
			alignItems: 'center'
		})
	}
);
