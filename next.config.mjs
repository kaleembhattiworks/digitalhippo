/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'digitalhippo-1v7f.onrender.com',
				port: '',
				pathname: '/media/**',
			},
		],
	},
};
