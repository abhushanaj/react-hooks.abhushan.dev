import React from 'react';

/**
 * useNavigatorLanguage() - Returns the language set on the browser for a user.
 *
 * @param {string} [defaultLang='en-US'] - Optional default language choice to use on server snapshots.
 * @returns {string} - A string representing the language version as defined in RFC 5646.
 *
 * @example
 * function App() {
 *     const preferredLanguage = useNavigatorLanguage();
 *     return (
 *         <div>
 *             <p>Preferred language is {preferredLanguage}</p>
 *         </div>
 *     );
 * }
 */
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
