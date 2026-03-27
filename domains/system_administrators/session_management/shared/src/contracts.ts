export interface LoginRequestDto {
	identifier: string;
	otp: string;
}

export interface SessionDto {
	actorType: 'system_administrators';
	accessToken: string;
	refreshToken: string;
}
