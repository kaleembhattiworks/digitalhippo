/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'digitalhippo.kaleembhattiworks.com',
				port: '',
				pathname: '/media/**',
			},
		],
	},
};
