import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
	slug: 'users',
	auth: {
		verify: {
			generateEmailHTML: ({ token }) => {
				return `<span>Click </span><a href='${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}'>Here</a><span> to verify your account</span>`;
			},
		},
	},
	access: {
		read: () => true,
		create: () => true,
	},
	fields: [
		{
			name: 'role',
			defaultValue: 'user',
			required: true,
			// admin: {
			// 	condition: () => false,
			// },
			type: 'select',
			options: [
				{ label: 'Admin', value: 'admin' },
				{ label: 'User', value: 'user' },
			],
		},
	],
};
