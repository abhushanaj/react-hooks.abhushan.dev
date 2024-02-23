import React from 'react';

type UseIntervalOptions = {
	callback: (...args: Array<unknown>) => void;
	delay: number;
	eager: boolean;
};

/**
 * useInterval hook - Custom react hook to invoke a callback function after a minimum delay (ms) using the setInterval method.
 * @param callback - The callback to invoke
 * @param duration - The duration for the interval specified in millisecond.
 * @param eager - Whether or not to invoke the callback immediately for first time. Defaults to undefined.
 * @returns
 */
export function useInterval(
	callback: UseIntervalOptions['callback'],
	duration?: UseIntervalOptions['delay'],
	eager?: UseIntervalOptions['eager']
) {
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

		if (eager) {
			callbackRef.current();
		}

		timerRef.current = window.setInterval(callbackRef.current, duration);

		return cancelInterval;
	}, [cancelInterval, duration, eager]);

	return [cancelInterval] as const;
}
