import React from 'react';

/**
 * useSampleCallback() - Custom react hook to invoke a callback after every "period" samples.
 * @see - https://react-hooks.abhushan.dev/hooks/bom/usesamplecallback/
 */
export const useSampleCallback = (callback: () => void, period: number) => {
	const calledRefCount = React.useRef(0);
	const callbackRef = React.useRef(callback);

	/**
	 * This can be replaced by new React.useEffectEvent hook
	 *
	 */

	React.useEffect(() => {
		callbackRef.current = callback;
	});

	const resultCallback = React.useCallback(() => {
		calledRefCount.current++;

		if (calledRefCount.current % period == 0) {
			callbackRef.current();
		}
	}, [period]);

	const reset = React.useCallback(() => {
		calledRefCount.current = 0;
	}, []);

	return [resultCallback, { reset }] as const;
};
