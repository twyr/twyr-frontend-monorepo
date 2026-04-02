const inflightRequests = new Map<string, Promise<unknown>>();

export function runWithInFlightDeduplication<T>(
	key: string,
	factory: () => Promise<T>
): Promise<T> {
	const existingRequest = inflightRequests.get(key);
	if (existingRequest) {
		return existingRequest as Promise<T>;
	}

	const request = factory().finally(() => {
		inflightRequests.delete(key);
	});

	inflightRequests.set(key, request);
	return request;
}
