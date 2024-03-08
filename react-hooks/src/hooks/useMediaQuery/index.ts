import React from 'react';

/**
 * useMediaQuery() - Custom react hook to check if the document matched a certain media uery string using the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) API.
 * @see -
 */
export function useMediaQuery(mediaQueryString: string, serverDefault = false) {
	const subscribe = React.useCallback(
		(onStoreChange: () => void) => {
			const media = window.matchMedia(mediaQueryString);

			media.addEventListener('change', onStoreChange);

			return () => {
				media.removeEventListener('change', onStoreChange);
			};
		},
		[mediaQueryString]
	);

	const getSnapshot = React.useCallback(() => {
		const media = window.matchMedia(mediaQueryString);
		return media.matches;
	}, [mediaQueryString]);

	const getServerSnapshot = React.useCallback(() => {
		return serverDefault;
	}, [serverDefault]);

	return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
