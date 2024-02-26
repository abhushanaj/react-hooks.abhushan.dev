import React from 'react';

/**
 * useIsDocumentVisible() - Custom react hook to subscribe and return the document's visibility state using the `document.visibilityState` property.
 * @see - https://react-hooks.abhushan.dev/hooks/timers/useinterval/
 */
export function useIsDocumentVisible() {
	const getSnapshot = React.useCallback(() => {
		return document.visibilityState === 'visible';
	}, []);

	const getServerSnapshot = React.useCallback(() => {
		return true;
	}, []);

	const subscribe = React.useCallback((cb: () => void) => {
		document.addEventListener('visibilitychange', cb);

		return () => {
			document.removeEventListener('visibilitychange', cb);
		};
	}, []);

	return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
