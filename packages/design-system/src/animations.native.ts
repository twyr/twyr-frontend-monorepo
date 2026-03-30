import { createAnimations } from '@tamagui/animations-react-native';
import { motion } from './motion';

export const animations = createAnimations({
	fast: {
		type: 'timing',
		duration: motion.fast
	},
	quick: {
		damping: 20,
		mass: 1,
		stiffness: 260
	},
	medium: {
		damping: 16,
		mass: 1,
		stiffness: 150
	},
	slow: {
		damping: 18,
		mass: 1.1,
		stiffness: 90
	},
	bouncy: {
		damping: 10,
		mass: 0.9,
		stiffness: 180
	},
	lazy: {
		type: 'timing',
		duration: motion.lazy
	},
	tooltip: {
		type: 'timing',
		duration: motion.tooltip
	}
});
