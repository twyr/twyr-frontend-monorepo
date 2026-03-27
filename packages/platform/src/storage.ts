export const storage = {
	async get(key: string): Promise<string | null> {
		return Promise.resolve(localStorage.getItem(key));
	},
	async set(key: string, value: string): Promise<void> {
		localStorage.setItem(key, value);
	}
};
