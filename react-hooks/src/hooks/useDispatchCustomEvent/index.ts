import React from 'react';

/**
 * useDispatchCustomEvent() - Custom react hook to dispatch a custom event with payload
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
