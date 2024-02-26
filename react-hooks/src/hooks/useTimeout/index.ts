import React from 'react';

/**
 * useTimeout() - Custom react hook to execute a callback after a given minimum delay (ms) using the window.setTimeout method
 * @see - https://react-hooks.abhushan.dev/hooks/timers/usetimeout/
 */
export function useTimeout(callback: () => void, delay = 0) {
	const timerRef = React.useRef<number | null>(null);
	const callbackRef = React.useRef(callback);

	/**
	 * We can achive this with the new experiment hook : React.useEffectEvent
	 * const onTimeout=React.useEffectEvent(callback)
	 */
	React.useEffect(() => {
		callbackRef.current = callback;
	});

	const cancelTimeout = React.useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	React.useEffect(() => {
		/**
		 * We can achive this with the new experiment hook : React.useEffectEvent
		 * timerRef.current = window.setTimeout(onTimeout, delay);
		 */
		timerRef.current = window.setTimeout(callbackRef.current, delay);

		return cancelTimeout;
	}, [delay, cancelTimeout]);

	return [cancelTimeout] as const;
}
