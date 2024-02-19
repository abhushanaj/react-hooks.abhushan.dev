import React from 'react';

/**
 * useOnline() hook: Get the status of the network using the navigator.onLine property along with subscription for changes.
 * @param {boolean} defaultStatus - Default status of the network for server snapshots. Defaults to true.
 * @returns {boolean} - The status of the network, whether it is online or not.
 * @example
 * function App() {
 *   const online = useOnline();
 *   return (
 *     <div>
 *       <p>The application is {online ? '🟢' : '🔴'}</p>
 *     </div>
 *   );
 * }
 */

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
