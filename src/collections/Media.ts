import { User } from '../payload-types';
import { Access, CollectionConfig } from 'payload/types';

const isAdminOrHasAccessToImages =
	(): Access =>
	async ({ req }) => {
		const user = req.user as User;

		if (!user) return false;

		if (user.role === 'admin') return true;

		return {
			user: {
				equals: req.user.id,
			},
		};
	};

export const Media: CollectionConfig = {
	slug: 'media',
	hooks: {
		beforeChange: [
			({ req, data }) => {
				return { ...data, user: req.user.id };
			},
		],
	},
	upload: {
		staticURL: '/media',
		staticDir: 'media',
		imageSizes: [
			{
				name: 'thumbnail',
				width: 400,
				height: 300,
				position: 'centre',
			},
			{
				name: 'card',
				width: 768,
				height: 1028,
				position: 'centre',
			},
			{
				name: 'tablet',
				width: 1024,
				height: undefined,
				position: 'centre',
			},
		],
		mimeTypes: ['image/*'],
	},
	fields: [
		{
			required: true,
			name: 'user',
			type: 'relationship',
			relationTo: 'users',
			hasMany: false,
			admin: {
				condition: () => false,
			},
		},
	],
	admin: {
		hidden: ({ user }) => user.role !== 'admin',
	},
	access: {
		read: async ({ req }) => {
			const referer = req.headers.referer;

			if (!req.user || !referer?.includes('sell')) {
				return true;
			}

			return await isAdminOrHasAccessToImages()({ req });
		},
		delete: isAdminOrHasAccessToImages(),
		update: isAdminOrHasAccessToImages(),
	},
};
