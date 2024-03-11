'use client';

import { buttonVariants } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Paynow({ orderId }: { orderId: string }) {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	function handleClick() {
		setIsLoading(true);
	}

	return (
		<Link href={`/thank-you?orderId=${orderId}`} onClick={handleClick} className={buttonVariants()}>
			{isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : null}
			{isLoading ? 'Paying' : 'Pay Now'}
		</Link>
	);
}
