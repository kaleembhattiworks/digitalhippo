/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
			{
				protocol: 'https',
				hostname: 'digitalhippo-1v7f.onrender.com/',
			},
		],
	},
};

module.exports = nextConfig;
