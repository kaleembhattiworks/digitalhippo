import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Paynow from './Paynow';

interface PageProps {
	params: {
		orderId: string;
	};
}

export default function Page({ params }: PageProps) {
	const { orderId } = params;

	return (
		<main className="relative lg:min-h-full">
			<div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12 bg-gradient-to-r from-violet-600 to-indigo-600"></div>
			<div className="mx-auto w-full relative max-w-screen-xl px-2.5 md:px-20  py-12 min-h-[calc(100vh-4rem)] flex items-center justify-center">
				<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
					<div className="lg:col-start-2 flex flex-col gap-y-4">
						<p className="text-sm font-medium text-blue-600">
							No payment method required for purchase.
						</p>
						<h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
							Just Click Pay
						</h1>
						<p className="text-xs md:text-sm">
							This is just a side project of mine but everything works as expected without a
							payment.{' '}
							<Link
								className="underline underline-offset-2 hover:underline-offset-4 font-semibold"
								target="_blank"
								href={'https://github.com/kaleembhattiworks'}
							>
								Click here to view my profile
							</Link>
						</p>
						<Separator className="bg-blue-500 h-0.5" />
						<Paynow orderId={orderId} />
					</div>
				</div>
			</div>
		</main>
	);
}
