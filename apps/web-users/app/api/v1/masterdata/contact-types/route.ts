import { NextResponse } from 'next/server';
import { buildAuthServerUrl } from '@twyr/core';

const CONTACT_TYPES_PATH = '/api/v1/masterdata/contact-types';

export async function GET(request: Request) {
	const cookieHeader = request.headers.get('cookie');
	const locale = new URL(request.url).searchParams.get('lang');

	try {
		const upstream = await fetch(
			buildAuthServerUrl(CONTACT_TYPES_PATH, {
				cookieHeader,
				locale
			}),
			{
				method: 'GET',
				headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
				cache: 'no-store'
			}
		);
		const responseText = await upstream.text();

		return new NextResponse(responseText, {
			status: upstream.status,
			headers: {
				'Content-Type':
					upstream.headers.get('content-type') ?? 'application/json'
			}
		});
	} catch (error) {
		console.error(
			'Failed to load contact types from core platform.',
			error
		);
		return NextResponse.json(
			{ error: 'Failed to load contact types from core platform' },
			{ status: 502 }
		);
	}
}
