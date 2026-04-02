function padDateSegment(value: number) {
	return value.toString().padStart(2, '0');
}

export function formatDateOnlyValue(value: Date) {
	return [
		value.getFullYear().toString().padStart(4, '0'),
		padDateSegment(value.getMonth() + 1),
		padDateSegment(value.getDate())
	].join('-');
}

export function parseDateOnlyValue(value: string) {
	const trimmedValue = value.trim();

	if (!trimmedValue) {
		return null;
	}

	const localDateMatch = trimmedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
	if (localDateMatch) {
		const year = Number(localDateMatch[1]);
		const month = Number(localDateMatch[2]);
		const day = Number(localDateMatch[3]);
		const parsed = new Date(year, month - 1, day);

		if (
			parsed.getFullYear() === year &&
			parsed.getMonth() === month - 1 &&
			parsed.getDate() === day
		) {
			return parsed;
		}

		return null;
	}

	const parsed = new Date(trimmedValue);
	if (Number.isNaN(parsed.getTime())) {
		return null;
	}

	return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

export function normalizeDateOnlyValue(value: string) {
	const parsed = parseDateOnlyValue(value);
	return parsed ? formatDateOnlyValue(parsed) : '';
}

export function getTodayDateOnlyValue() {
	return formatDateOnlyValue(new Date());
}
