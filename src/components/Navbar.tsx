import MaxWidthWrapper from './MaxWidthWrapper';
import { Icons } from './Icons';
import NavItems from './NavItems';
import { buttonVariants } from './ui/button';
import Link from 'next/link';
import Cart from './Cart';
import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';
import UserAccountNav from './UserAccountNav';

export default async function Navbar() {
	const nextCookies = cookies();
	const { user } = await getServerSideUser(nextCookies);

	return (
		<div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
			<header className="relative bg-white">
				<MaxWidthWrapper>
					<div className="border-b border-gray-200">
						<div className="flex h-16 items-center">
							{/* <MobileNav /> */}

							<div className="ml-4 flex lg:ml-0">
								<Link href="/">
									<Icons.logo className="h-10 w-10" />
								</Link>
							</div>

							<div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
								<NavItems />
							</div>

							<div className="ml-auto flex items-center">
								<div className="flex flex-1 items-center justify-end space-x-6">
									{user ? null : (
										<Link
											href="/sign-in"
											className={buttonVariants({
												variant: 'ghost',
												className: 'hidden sm:block',
											})}
										>
											Sign in
										</Link>
									)}

									{user ? null : (
										<span className="h-6 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />
									)}

									{user ? (
										<>
											<UserAccountNav user={user} />
											<span className="h-6 w-px bg-gray-200 sm:hidden" aria-hidden="true" />
										</>
									) : (
										<Link
											href="/sign-up"
											className={buttonVariants({
												variant: 'ghost',
												className: 'hidden sm:block',
											})}
										>
											Create account
										</Link>
									)}

									{user ? (
										<span className="h-6 w-px bg-gray-200 hidden sm:block" aria-hidden="true" />
									) : null}

									{user ? null : (
										<div className="sm:ml-6 hidden sm:flex">
											<span className="h-6 w-px bg-gray-200" aria-hidden="true" />
										</div>
									)}

									<div className="ml-4 flow-root sm:ml-6">
										<Cart />
									</div>
								</div>
							</div>
						</div>
					</div>
				</MaxWidthWrapper>
			</header>
		</div>
	);
}
