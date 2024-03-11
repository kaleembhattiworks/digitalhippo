import { BeforeChangeHook } from 'payload/dist/collections/config/types';
import { PRODUCT_CATEGORIES } from '../../config';
import { CollectionConfig } from 'payload/types';
import { Product } from '../../payload-types';

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
	const user = req.user;

	return { ...data, user: user.id };
};

export const Products: CollectionConfig = {
	slug: 'products',
	admin: {
		useAsTitle: 'name',
	},
	access: {
		read: () => true,
		create: () => true,
	},
	hooks: {
		beforeChange: [addUser],
	},
	fields: [
		{
			required: true,
			hasMany: false,
			name: 'user',
			type: 'relationship',
			relationTo: 'users',
			admin: {
				condition: () => false,
			},
		},
		{
			required: true,
			name: 'name',
			label: 'Name',
			type: 'text',
		},
		{
			required: true,
			name: 'description',
			type: 'text',
			label: 'Product Details',
		},
		{
			required: true,
			name: 'price',
			label: 'Price (USD) (1 - 1000)',
			type: 'number',
			min: 0,
			max: 1000,
		},
		{
			required: true,
			name: 'category',
			label: 'Category',
			type: 'select',
			options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
		},
		{
			required: true,
			hasMany: false,
			name: 'product_files',
			label: 'Product Files(s)',
			type: 'relationship',
			relationTo: 'product_files',
		},
		{
			name: 'approvedForSale',
			label: 'Product Status',
			type: 'select',
			defaultValue: 'pending',
			access: {
				create: ({ req }) => req.user.role === 'admin',
				read: ({ req }) => req.user.role === 'admin',
				update: ({ req }) => req.user.role === 'admin',
			},
			options: [
				{
					label: 'Pending verification',
					value: 'pending',
				},
				{
					label: 'Approved',
					value: 'approved',
				},
				{
					label: 'Denied',
					value: 'denied',
				},
			],
		},
		{
			required: true,
			name: 'images',
			type: 'array',
			labels: {
				singular: 'Image',
				plural: 'Images',
			},
			label: 'Product Images',
			minRows: 1,
			maxRows: 4,
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
			],
		},
	],
};
