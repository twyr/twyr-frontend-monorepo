import Constants from 'expo-constants';
import { buildAuthServerUrl, type AuthServerEnvironment } from '@twyr/core';

type MobileExtra = {
	expoPublicAuthServerProtocol?: string;
	expoPublicAuthServerIp?: string;
	expoPublicAuthServerPort?: string;
	authServerProtocol?: string;
	authServerIp?: string;
	authServerPort?: string;
};

function getEmbeddedEnvironment(): AuthServerEnvironment {
	const extra = (Constants.expoConfig?.extra ?? {}) as MobileExtra;
	const processLike =
		typeof globalThis === 'object' &&
		globalThis !== null &&
		'process' in globalThis
			? (
					globalThis as {
						process?: { env?: Record<string, string | undefined> };
					}
				).process
			: undefined;

	return {
		AUTH_SERVER_PROTOCOL:
			extra.expoPublicAuthServerProtocol ??
			extra.authServerProtocol ??
			processLike?.env?.EXPO_PUBLIC_AUTH_SERVER_PROTOCOL ??
			processLike?.env?.AUTH_SERVER_PROTOCOL,
		AUTH_SERVER_IP:
			extra.expoPublicAuthServerIp ??
			extra.authServerIp ??
			processLike?.env?.EXPO_PUBLIC_AUTH_SERVER_IP ??
			processLike?.env?.AUTH_SERVER_IP,
		AUTH_SERVER_PORT:
			extra.expoPublicAuthServerPort ??
			extra.authServerPort ??
			processLike?.env?.EXPO_PUBLIC_AUTH_SERVER_PORT ??
			processLike?.env?.AUTH_SERVER_PORT
	};
}

export function buildMobileCorePlatformUrl(path: string, locale?: string) {
	return buildAuthServerUrl(path, { locale }, getEmbeddedEnvironment());
}
