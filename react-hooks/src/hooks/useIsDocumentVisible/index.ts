import React from 'react';

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
