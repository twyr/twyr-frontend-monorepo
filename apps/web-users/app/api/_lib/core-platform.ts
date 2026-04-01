import { NextResponse } from 'next/server';
import {
	applyProxiedSetCookies,
	buildAuthServerUrl,
	getUpstreamErrorMessage,
	withNameLocale
} from '@twyr/core';

type ProxyOptions = {
	path: string;
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	bodyText?: string;
	includeNameLocale?: boolean;
};

export async function proxyCorePlatformRequest(
	request: Request,
	{ path, method, bodyText, includeNameLocale = false }: ProxyOptions
) {
	const cookieHeader = request.headers.get('cookie');
	const locale = new URL(request.url).searchParams.get('lang');
	const url = buildAuthServerUrl(path, {
		cookieHeader,
		locale
	});

	try {
		const upstreamBody =
			method === 'GET' || method === 'DELETE' || !bodyText
				? undefined
				: includeNameLocale
					? withNameLocale(
							bodyText,
							new URL(url).searchParams.get('lang')
						)
					: bodyText;
		const upstream = await fetch(url, {
			method,
			headers: {
				...(cookieHeader ? { Cookie: cookieHeader } : {}),
				...(upstreamBody ? { 'Content-Type': 'application/json' } : {})
			},
			body: upstreamBody,
			cache: 'no-store'
		});
		const response =
			upstream.status === 204 || upstream.status === 205
				? new NextResponse(null, {
						status: upstream.status
					})
				: new NextResponse(await upstream.text(), {
						status: upstream.status,
						headers: {
							'Content-Type':
								upstream.headers.get('content-type') ??
								'application/json'
						}
					});

		applyProxiedSetCookies(response, upstream.headers);

		return response;
	} catch (error) {
		console.error(`Failed to call ${path}.`, error);
		return NextResponse.json(
			{ error: getUpstreamErrorMessage(error) },
			{ status: 502 }
		);
	}
}
