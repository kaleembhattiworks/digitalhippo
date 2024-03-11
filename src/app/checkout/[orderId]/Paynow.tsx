'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Paynow({ orderId, userId }: { orderId: string; userId: string }) {
	let isLoading;

	const router = useRouter();

	function handleClick() {
		isLoading = true;
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
