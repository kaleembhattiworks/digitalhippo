'use client';

import { useCart } from '@/hooks/use-cart';
import { User } from '../payload-types';
import { trpc } from '@/trpc/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface PaymentStatusProps {
	orderEmail: string;
	orderId: string;
	isPaid: boolean;
	user: User;
}

const PaymentStatus = ({ orderEmail, orderId, isPaid, user }: PaymentStatusProps) => {
	const router = useRouter();

	const { clearCart } = useCart();

	const { data } = trpc.payment.pollOrderStatus.useQuery(
		{ orderId },
		{
			enabled: isPaid === false,
			refetchInterval: (data) => (data?.isPaid ? false : 1000),
		}
	);

	useEffect(() => {
		if (data?.isPaid) {
			clearCart();
			router.refresh();
		}
	}, [data?.isPaid, router, clearCart]);

	return (
		<div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm text-gray-600">
			<div>
				<p className="font-medium text-gray-900">Shipping To</p>
				<p>{orderEmail}</p>
			</div>

			<div>
				<p className="font-medium text-gray-900">Order Status</p>
				<p>{isPaid ? 'Payment successful' : 'Pending payment'}</p>
			</div>
		</div>
	);
};

export default PaymentStatus;
