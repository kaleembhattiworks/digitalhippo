import { BeforeChangeHook, AfterChangeHook } from 'payload/dist/collections/config/types';
import { PRODUCT_CATEGORIES } from '../../config';
import { Access, CollectionConfig } from 'payload/types';
import { Product, User } from '../../payload-types';

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
	const user = req.user;

	return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
	const fullUser = await req.payload.findByID({
		collection: 'users',
		id: req.user.id,
	});

	if (fullUser && typeof fullUser === 'object') {
		const { products } = fullUser;

		const allIDs = [
			...(products?.map((product) => (typeof product === 'object' ? product.id : product)) || []),
		];

		const createdProductIDs = allIDs.filter((id, index) => allIDs.indexOf(id) === index);

		const dataToUpdate = [...createdProductIDs, doc.id];

		await req.payload.update({
			collection: 'users',
			id: fullUser.id,
			data: {
				products: dataToUpdate,
			},
		});
	}
};

const isAdminOrHasAccess =
	(): Access =>
	({ req: { user: _user } }) => {
		const user = _user as User | undefined;

		if (!user) return false;
		if (user.role === 'admin') return true;

		const userProductIDs = (user.products || []).reduce<Array<string>>((acc, product) => {
			if (!product) return acc;
			if (typeof product === 'string') {
				acc.push(product);
			} else {
				acc.push(product.id);
			}

			return acc;
		}, []);

		return {
			id: {
				in: userProductIDs,
			},
		};
	};

export const Products: CollectionConfig = {
	slug: 'products',
	admin: {
		useAsTitle: 'name',
	},
	access: {
		read: isAdminOrHasAccess(),
		update: isAdminOrHasAccess(),
		delete: isAdminOrHasAccess(),
	},
	hooks: {
		beforeChange: [addUser],
		afterChange: [syncUser],
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
