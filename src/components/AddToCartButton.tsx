'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';

const AddToCartButton = ({ product }: { product: Product }) => {
	const { addItem, items } = useCart();
	const isSuccess = items.map((item) => item.product.id === product.id);

	return (
		<Button
			onClick={() => {
				addItem(product);
			}}
			size="lg"
			className="w-full"
		>
			{isSuccess.length > 0 ? `Added!` : `Add to cart`}
		</Button>
	);
};

export default AddToCartButton;
