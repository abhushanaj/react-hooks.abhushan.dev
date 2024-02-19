import React from 'react';

export function useNavigatorLanguage(defaultLang = 'en-US') {
	const getSnapShot = React.useCallback(() => {
		return window.navigator.language;
	}, []);

	const getServerSnapShot = React.useCallback(() => {
		return defaultLang;
	}, [defaultLang]);

	const subscribe = React.useCallback((cb: () => void) => {
		window.addEventListener('languagechange', cb);
		return () => {
			window.removeEventListener('languagechange', cb);
		};
	}, []);

	return React.useSyncExternalStore(subscribe, getSnapShot, getServerSnapShot);
}
