import React from 'react';

import { noop } from '../../utils';

/**
 * useIntervalWhen() - Custom react hook to invoke a callback function at minimum duration of (ms) using the setInterval method. The intervals can be controlled using a when flag to stop/start/restart the intervals.
 * @see - https://react-hooks.abhushan.dev/hooks/timers/useintervalwhen/
 */
export function useIntervalWhen(callback: () => void, duration = 0, immediate = false, when = true) {
	const callbackRef = React.useRef(callback);
	const timerRef = React.useRef<number | null>(null);

	const clearTimer = React.useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	React.useEffect(() => {
		callbackRef.current = callback;
	});

	React.useEffect(() => {
		if (!when) {
			return noop();
		}

		if (immediate) {
			callbackRef.current();
		}
		timerRef.current = window.setInterval(callbackRef.current, duration);

		return clearTimer;
	}, [clearTimer, immediate, duration, when]);

	return [clearTimer] as const;
}
