import { NextResponse } from 'next/server';
import { buildAuthServerUrl } from '@twyr/core';

const COUNTRY_CODES_PATH = '/api/v1/masterdata/country-codes';

export async function GET(request: Request) {
	const cookieHeader = request.headers.get('cookie');
	const locale = new URL(request.url).searchParams.get('lang');

	try {
		const upstream = await fetch(
			buildAuthServerUrl(COUNTRY_CODES_PATH, {
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
			'Failed to load country codes from core platform.',
			error
		);
		return NextResponse.json(
			{ error: 'Failed to load country codes from core platform' },
			{ status: 502 }
		);
	}
}
