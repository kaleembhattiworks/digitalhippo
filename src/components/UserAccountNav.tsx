'use client';

import { User } from '../payload-types';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';
import { useAuth } from '../hooks/use-auth';
import { CircleUserRound } from 'lucide-react';

const UserAccountNav = ({ user }: { user: User }) => {
	const { signOut } = useAuth();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{/* <Button variant="ghost" size="sm" className="relative">
					My account
				</Button> */}
				<div className="h-10 w-10 py-2 group">
					<CircleUserRound
						className="relative w-full h-full flex-shrink-0 text-gray-400 group-hover:text-gray-500"
						aria-hidden="true"
					/>
				</div>
			</DropdownMenuTrigger>

			<DropdownMenuContent className="bg-white w-60" align="center">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-0.5 leading-none">
						<p className="font-medium text-sm text-black">{user.email}</p>
					</div>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href="/sell">Seller Dashboard</Link>
				</DropdownMenuItem>

				<DropdownMenuItem onClick={signOut} className="cursor-pointer">
					Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAccountNav;
