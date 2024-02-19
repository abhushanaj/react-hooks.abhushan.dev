import React from 'react';

export function useOnline(defaultStatus = true) {
	const getSnapshot = React.useCallback(() => {
		return window.navigator.onLine;
	}, []);

	const getServerSnapshot = React.useCallback(() => {
		return defaultStatus;
	}, [defaultStatus]);

	const subscribe = React.useCallback((callback: () => void) => {
		// subscribe to the online and offline events which trigger the callback on change
		window.addEventListener('online', callback);
		window.addEventListener('offline', callback);

		// unsubscribe from the to the online and offline events
		return () => {
			window.removeEventListener('online', callback);
			window.removeEventListener('offline', callback);
		};
	}, []);

	return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
