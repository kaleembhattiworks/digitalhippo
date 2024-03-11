import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { User } from '../payload-types';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { NextResponse } from 'next/server';

export async function getServerSideUser(
	cookies: NextResponse['cookies'] | ReadonlyRequestCookies | RequestCookies
) {
	const token = cookies.get('payload-token')?.value;

	const meRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
		headers: {
			Authorization: `JWT ${token}`,
		},
	});

	const { user } = (await meRes.json()) as { user: User | null };

	return { user };
}
