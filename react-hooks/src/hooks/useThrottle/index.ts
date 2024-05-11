import React from 'react';

import type { CallbackWithArgs } from '../../utils/types';

import { useOnUnmount } from '../useOnUnmount';

/**
 * useThrottle() - Custom react hook to throttle a callback function for duration(ms) period.
 * @see - https://react-hooks.abhushan.dev/hooks/utilities/usethrottle/
 */
export const useThrottle = <T extends CallbackWithArgs>(callback: T, duration: number) => {
	if (duration < 0) {
		throw new Error('Duration can only be greater than or equal to zero.');
	}
	/**
	 * This reactive but non synchronizing value can be replaced with useEffectEvent in future
	 */
	const callbackRef = React.useRef(callback);
	const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
	const isThrottledRef = React.useRef(false);

	React.useEffect(() => {
		callbackRef.current = callback;
	});

	const cancel = React.useCallback(() => {
		isThrottledRef.current = false;
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	useOnUnmount(cancel);

	const throttledFn = React.useCallback(
		function (...args: Array<unknown>) {
			if (isThrottledRef.current) {
				return;
			}

			callbackRef.current(...args);
			isThrottledRef.current = true;

			timerRef.current = setTimeout(() => {
				timerRef.current = null;
				isThrottledRef.current = false;
			}, duration);
		},
		[duration]
	);

	return [throttledFn, { cancel }] as const;
};
