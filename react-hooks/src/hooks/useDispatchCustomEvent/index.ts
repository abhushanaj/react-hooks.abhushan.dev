import React from 'react';

/**
 * useDefault() - Custom react hook to dispatch a custom events
 * @see - https://react-hooks.abhushan.dev/hooks/state/usedispatchcustomevent/
 */
export const useDispatchCustomEvent = (eventName: string) => {
	const dispatch = React.useCallback(
		<T>(payload?: T) => {
			window.dispatchEvent(new CustomEvent(eventName, { detail: payload ?? null }));
		},
		[eventName]
	);

	return dispatch;
};
