import React from 'react';

type UseIntervalOptions = {
	callback: (...args: Array<unknown>) => void;
	delay: number;
};

export function useInterval(callback: UseIntervalOptions['callback'], delay?: UseIntervalOptions['delay']) {
	const timerRef = React.useRef<number | null>(null);
	const callbackRef = React.useRef(callback);

	/**
	 *  This is done to make a reactive value of callback but not synchornize with component on the effect
	 * This shoudl be replaced using the experimental React.useEffect hook
	 * `const onInterval= React.useEffectEvent(callback)`
	 * Then use this onInterval in useEffect witout listing as dependency
	 */
	React.useEffect(() => {
		callbackRef.current = callback;
	});

	const cancelInterval = React.useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	React.useEffect(() => {
		/**
		 * This line can actually be replaced with the new experimental React.useEffectCallack hook as well
		 * `timerRef.current = window.setInterval(onInterval, 200);`
		 */
		timerRef.current = window.setInterval(callbackRef.current, delay);

		return cancelInterval;
	}, [cancelInterval, delay]);

	return [cancelInterval] as const;
}
