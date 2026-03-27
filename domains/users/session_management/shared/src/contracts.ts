export interface LoginRequestDto {
	identifier: string;
	otp: string;
}

export interface SessionDto {
	actorType: 'users';
	accessToken: string;
	refreshToken: string;
}
