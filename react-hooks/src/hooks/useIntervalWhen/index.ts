import React from 'react';

import { noop } from '../../utils';

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
