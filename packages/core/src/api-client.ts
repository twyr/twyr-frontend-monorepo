export interface ApiClientOptions {
	baseUrl: string;
	defaultHeaders?: Record<string, string>;
}

export class ApiClient {
	private readonly baseUrl: string;
	private readonly defaultHeaders: Record<string, string>;

	constructor(options: ApiClientOptions) {
		this.baseUrl = options.baseUrl.replace(/\/$/, '');
		this.defaultHeaders = options.defaultHeaders ?? {};
	}

	async post<TResponse>(
		path: string,
		body: unknown,
		init?: RequestInit
	): Promise<TResponse> {
		const response = await fetch(`${this.baseUrl}${path}`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				...this.defaultHeaders,
				...(init?.headers ?? {})
			},
			body: JSON.stringify(body),
			...init
		});

		if (!response.ok) {
			throw new Error(
				`Request failed: ${response.status} ${response.statusText}`
			);
		}

		return (await response.json()) as TResponse;
	}

	async get<TResponse>(path: string, init?: RequestInit): Promise<TResponse> {
		const response = await fetch(`${this.baseUrl}${path}`, {
			method: 'GET',
			headers: {
				...this.defaultHeaders,
				...(init?.headers ?? {})
			},
			...init
		});

		if (!response.ok) {
			throw new Error(
				`Request failed: ${response.status} ${response.statusText}`
			);
		}

		return (await response.json()) as TResponse;
	}
}
