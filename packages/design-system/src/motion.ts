export const motion = {
	fast: 120,
	moderate: 200,
	slow: 320,
	deliberate: 480,
	lazy: 640,
	tooltip: 180,
	easing: {
		productive: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
		enter: 'ease-out',
		exit: 'ease-in'
	}
} as const;
