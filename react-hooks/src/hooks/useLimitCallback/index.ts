import React from 'react';

/**
 * useLimitCallback() - Custom react hook to invoke a callback only n times.
 * @see - https://react-hooks.abhushan.dev/hooks/bom/uselimitcallback/
 */
export const useLimitCallback = (callback: () => void, limit: number) => {
	const callbackRef = React.useRef(callback);
	const invocationsRef = React.useRef(0);

	React.useEffect(() => {
		callbackRef.current = callback;
	});

	const limitedCallback = React.useCallback(() => {
		invocationsRef.current++;

		if (invocationsRef.current <= limit) {
			callbackRef.current();
		}
	}, [limit]);

	const reset = React.useCallback(() => {
		invocationsRef.current = 0;
	}, []);

	return [limitedCallback, { reset }] as const;
};
