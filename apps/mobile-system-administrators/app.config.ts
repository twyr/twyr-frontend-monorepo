import type { ExpoConfig } from 'expo/config';

const authServerProtocol =
	process.env.EXPO_PUBLIC_AUTH_SERVER_PROTOCOL ??
	process.env.AUTH_SERVER_PROTOCOL ??
	'http';
const authServerIp =
	process.env.EXPO_PUBLIC_AUTH_SERVER_IP ??
	process.env.AUTH_SERVER_IP ??
	'localhost';
const authServerPort =
	process.env.EXPO_PUBLIC_AUTH_SERVER_PORT ??
	process.env.AUTH_SERVER_PORT ??
	'9090';
const authServerBaseUrl = `${authServerProtocol}://${authServerIp}:${authServerPort}`;

const config: ExpoConfig = {
	name: 'Twyr Mobile System Administrators',
	slug: 'twyr-mobile-system-administrators',
	userInterfaceStyle: 'automatic',
	extra: {
		expoPublicAuthServerProtocol: authServerProtocol,
		expoPublicAuthServerIp: authServerIp,
		expoPublicAuthServerPort: authServerPort,
		expoPublicAuthServerBaseUrl: authServerBaseUrl,
		authServerProtocol,
		authServerIp,
		authServerPort,
		authServerBaseUrl
	}
};

export default config;
