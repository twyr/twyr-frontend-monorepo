import { useCallback, useEffect, useRef } from 'react';
import type { AppLanguageCode } from '@twyr/core';

type PageRequestHandler = (locale: AppLanguageCode) => Promise<void> | void;

export function useLocalizedPageRequests(locale: AppLanguageCode) {
	const requestsRef = useRef(new Map<string, PageRequestHandler>());
	const lastLocaleRef = useRef(locale);
	const hasInitializedLocaleRef = useRef(false);

	const registerRequest = useCallback(
		(key: string, request: PageRequestHandler) => {
			requestsRef.current.set(key, request);
		},
		[]
	);

	const unregisterRequest = useCallback((key: string) => {
		requestsRef.current.delete(key);
	}, []);

	const runRequest = useCallback(
		async (key: string, request: PageRequestHandler) => {
			requestsRef.current.set(key, request);
			await request(locale);
		},
		[locale]
	);

	useEffect(() => {
		if (!hasInitializedLocaleRef.current) {
			hasInitializedLocaleRef.current = true;
			lastLocaleRef.current = locale;
			return;
		}

		if (lastLocaleRef.current === locale) {
			return;
		}

		lastLocaleRef.current = locale;
		const requests = Array.from(requestsRef.current.values());

		void Promise.allSettled(
			requests.map((request) => Promise.resolve(request(locale)))
		);
	}, [locale]);

	return {
		registerRequest,
		unregisterRequest,
		runRequest
	};
}
