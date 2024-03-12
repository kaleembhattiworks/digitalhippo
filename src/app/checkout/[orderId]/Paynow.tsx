'use client';

import { buttonVariants } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import Link from 'next/link';

export default function Paynow({ orderId }: { orderId: string }) {
	const { clearCart } = useCart();

	function handleClick() {
		clearCart();
	}

	return (
		<Link
			onClick={handleClick}
			href={`/thank-you?orderId=${orderId}`}
			className={buttonVariants({ size: 'lg', className: 'w-full' })}
		>
			Pay Now
		</Link>
	);
}
