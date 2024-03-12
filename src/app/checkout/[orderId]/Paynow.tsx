'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Paynow({ orderId, userId }: { orderId: string; userId: string }) {
	let isLoading;

	const router = useRouter();
	const { clearCart } = useCart();

	function handleClick() {
		isLoading = true;
		clearCart();

		router.push(`/thank-you?orderId=${orderId}`);
		router.refresh();
	}

	return (
		<Button
			className={cn('w-full', {
				'pointer-events-none opacity-50': isLoading,
			})}
			onClick={handleClick}
			size={'lg'}
		>
			{isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
			{isLoading ? 'Paying' : 'Pay Now'}
		</Button>
	);
}
