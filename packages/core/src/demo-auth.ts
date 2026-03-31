export type DemoActor = 'users' | 'system_administrators';

export function createDemoOtp(actor: DemoActor, phoneNumber: string): string {
	const digits = phoneNumber.replace(/\D/g, '').slice(-4);
	const baseValue = digits.length === 4 ? Number.parseInt(digits, 10) : 1234;
	const actorOffset = actor === 'system_administrators' ? 271 : 149;
	const generated = ((baseValue + actorOffset) % 9000) + 1000;

	return String(generated);
}
