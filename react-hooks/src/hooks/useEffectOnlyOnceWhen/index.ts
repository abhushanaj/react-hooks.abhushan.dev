import React from 'react';

/**
 * useEffectOnlyOnceWhen() - Custom react hook to execute a callback function only once when a specified condition becomes true.
 * @see - https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useeffectonlyoncewhen/
 */
export function useEffectOnlyOnceWhen(callback: () => void, condition: boolean) {
	const callbackRef = React.useRef(callback);
	const isCalledOnceRef = React.useRef(false);

	React.useEffect(() => {
		callbackRef.current = callback;
	});

	React.useEffect(() => {
		if (condition && !isCalledOnceRef.current) {
			callbackRef.current();
			isCalledOnceRef.current = true;
		}
	}, [condition]);
}
