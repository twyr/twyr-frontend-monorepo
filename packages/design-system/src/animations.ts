import { createAnimations } from '@tamagui/animations-css';
import { motion } from './motion';

export const animations = createAnimations({
	fast: `${motion.easing.enter} ${motion.fast}ms`,
	quick: `${motion.easing.productive} ${motion.moderate}ms`,
	medium: `${motion.easing.productive} ${motion.slow}ms`,
	slow: `${motion.easing.productive} ${motion.deliberate}ms`,
	bouncy: `${motion.easing.productive} ${motion.slow}ms`,
	lazy: `${motion.easing.exit} ${motion.lazy}ms`,
	tooltip: `${motion.easing.enter} ${motion.tooltip}ms`
});
