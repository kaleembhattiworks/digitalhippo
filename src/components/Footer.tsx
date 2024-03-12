'use client';

import { usePathname } from 'next/navigation';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import Link from 'next/link';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const Footer = () => {
	const pathname = usePathname();
	const pathsToMinimize = ['/verify-email', '/sign-up', '/sign-in'];

	return (
		<footer className="bg-white flex-grow-0">
			<MaxWidthWrapper>
				<div className="border-t border-gray-200">
					{pathsToMinimize.includes(pathname) ? null : (
						<div className="pb-8 pt-16">
							<div className="flex justify-center">
								<Icons.logo className="h-12 w-auto" />
							</div>
						</div>
					)}

					{pathsToMinimize.includes(pathname) ? null : (
						<div>
							<div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
								<div className="absolute inset-0 overflow-hidden rounded-lg">
									<div
										aria-hidden="true"
										className="absolute bg-zinc-50 inset-0 bg-gradient-to-br bg-opacity-90"
									/>
								</div>

								<div className="text-center relative mx-auto max-w-sm">
									<h3 className="font-semibold text-gray-900">Become a seller</h3>
									<p className="mt-2 text-sm text-muted-foreground">
										If you&apos;d like to sell high-quality digital products, you can do so in
										minutes.{' '}
										<Link
											href="/sign-in?as=seller"
											className="whitespace-nowrap font-medium text-black hover:text-zinc-900"
										>
											Get started &rarr;
										</Link>
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				<div className="py-10 md:flex md:items-center md:justify-between">
					<div className="text-center md:text-left">
						<p className="text-sm text-muted-foreground">
							&copy; {new Date().getFullYear()} All Rights Reserved
						</p>
					</div>

					<div className="mt-4 flex items-center justify-center md:mt-0">
						<div className="flex space-x-8">
							<HoverCard>
								<HoverCardTrigger className="text-sm text-muted-foreground hover:text-gray-600 cursor-pointer">
									Terms
								</HoverCardTrigger>
								<HoverCardContent>
									There are no terms - this is a personal project, you&apos;re free to look at the{' '}
									<Link
										href={`https://github.com/kaleembhattiworks`}
										className="underline underline-offset-2 hover:underline"
									>
										source
									</Link>
								</HoverCardContent>
							</HoverCard>
							<HoverCard>
								<HoverCardTrigger className="text-sm text-muted-foreground hover:text-gray-600 cursor-pointer">
									Privacy Policy
								</HoverCardTrigger>
								<HoverCardContent>
									There is no privacy policy - this is a personal project, you&apos;re free to look
									at the{' '}
									<Link
										href={`https://github.com/kaleembhattiworks`}
										className="underline underline-offset-2 hover:underline"
									>
										source
									</Link>
								</HoverCardContent>
							</HoverCard>
							<HoverCard>
								<HoverCardTrigger className="text-sm text-muted-foreground hover:text-gray-600 cursor-pointer">
									Cookie Policy
								</HoverCardTrigger>
								<HoverCardContent>
									There is no cookie policy - this is a personal project, you&apos;re free to look
									at the{' '}
									<Link
										href={`https://github.com/kaleembhattiworks`}
										className="underline underline-offset-2 hover:underline"
									>
										source
									</Link>
								</HoverCardContent>
							</HoverCard>
						</div>
					</div>
				</div>
			</MaxWidthWrapper>
		</footer>
	);
};

export default Footer;
