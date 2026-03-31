import Constants from 'expo-constants';
import {
	buildAuthServerUrl,
	createPortalApiClient,
	type AppLanguageCode,
	type AuthServerEnvironment,
	type PortalActor
} from '@twyr/core';

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

	return {
		AUTH_SERVER_PROTOCOL:
			extra.expoPublicAuthServerProtocol ??
			extra.authServerProtocol ??
			process.env.EXPO_PUBLIC_AUTH_SERVER_PROTOCOL ??
			process.env.AUTH_SERVER_PROTOCOL,
		AUTH_SERVER_IP:
			extra.expoPublicAuthServerIp ??
			extra.authServerIp ??
			process.env.EXPO_PUBLIC_AUTH_SERVER_IP ??
			process.env.AUTH_SERVER_IP,
		AUTH_SERVER_PORT:
			extra.expoPublicAuthServerPort ??
			extra.authServerPort ??
			process.env.EXPO_PUBLIC_AUTH_SERVER_PORT ??
			process.env.AUTH_SERVER_PORT
	};
}

export function buildMobileCorePlatformUrl(path: string, locale?: string) {
	return buildAuthServerUrl(path, { locale }, getEmbeddedEnvironment());
}

export function createMobilePortalApi(
	actor: PortalActor,
	language: AppLanguageCode
) {
	return createPortalApiClient({
		actor,
		buildUrl: (path, locale) =>
			buildMobileCorePlatformUrl(path, locale ?? language)
	});
}
