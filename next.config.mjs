/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'kaleembhattiworks.com',
				port: '',
				pathname: '/media/**',
			},
		],
	},
};
