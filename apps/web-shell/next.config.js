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
	]
};

export default nextConfig;
