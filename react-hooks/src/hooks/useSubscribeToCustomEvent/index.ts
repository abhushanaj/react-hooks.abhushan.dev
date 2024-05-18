import React from 'react';

/**
 * useSubscribeToCustomEvent() - Custom react hook to subscribe and manage lifecycle of custom events.
 * @see - https://react-hooks.abhushan.dev/hooks/state/usesubscribetocustomevent/
 */
export const useSubscribeToCustomEvent = <T>(eventName: string, callback: (e: CustomEvent<T>) => void) => {
	/**
	 * This can be replaced with useEffect Event in future
	 */
	const callbackRef = React.useRef(callback);
	React.useEffect(() => {
		callbackRef.current = callback;
	});

	const evtCallback = React.useCallback((e: Event) => {
		if (e instanceof CustomEvent) {
			callbackRef.current(e as CustomEvent<T>);
		}
	}, []);

	const unSubscribe = React.useCallback(() => {
		window.removeEventListener(eventName, evtCallback);
	}, [eventName, evtCallback]);

	React.useEffect(() => {
		window.addEventListener(eventName, evtCallback);

		return unSubscribe;
	}, [eventName, unSubscribe, evtCallback]);

	return unSubscribe;
};
