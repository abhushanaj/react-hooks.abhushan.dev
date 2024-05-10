import React from 'react';

import { useOnUnmount } from '../useOnUnmount';

type CallbackWithArgs = (...args: Array<unknown>) => void;

/**
 * useDebounce() - Custom react hooks to debounce a callback function for wait(ms) period.
 * @see - https://react-hooks.abhushan.dev/hooks/utilities/usedebounce/
 */
export const useDebounce = (callback: CallbackWithArgs, wait: number) => {
	if (wait < 0) {
		throw new Error('Only values greater than or equal to zero is possible for wait parameter');
	}

	/**
	 * This reactive but non synchornizing value of callback can be replaced with useEffectEvent
	 */
	const callbackRef = React.useRef(callback);
	const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	React.useEffect(() => {
		callbackRef.current = callback;
	});

	const cancel = React.useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const debouncedFn = React.useCallback(
		function (...args: Array<unknown>) {
			cancel();

			timerRef.current = setTimeout(() => {
				callbackRef.current(...args);
				timerRef.current = null;
			}, wait);
		},
		[cancel, wait]
	);

	useOnUnmount(cancel);

	return [debouncedFn, { cancel }] as const;
};
