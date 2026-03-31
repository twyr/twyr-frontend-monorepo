const authServerProtocol = process.env.AUTH_SERVER_PROTOCOL ?? 'http';
const authServerIp = process.env.AUTH_SERVER_IP ?? 'localhost';
const authServerPort = process.env.AUTH_SERVER_PORT ?? '9090';
const authServerBaseUrl = `${authServerProtocol}://${authServerIp}:${authServerPort}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
	transpilePackages: [
		'tamagui',
		'@tamagui/core',
		'@tamagui/web',
		'@tamagui/toast',
		'@twyr/app-providers',
		'@twyr/app-shells',
		'@twyr/design-system',
		'@twyr/ui-kit',
		'@twyr/ui-composed'
	],
	env: {
		AUTH_SERVER_PROTOCOL: authServerProtocol,
		AUTH_SERVER_IP: authServerIp,
		AUTH_SERVER_PORT: authServerPort,
		NEXT_PUBLIC_AUTH_SERVER_BASE_URL: authServerBaseUrl
	}
};

export default nextConfig;
