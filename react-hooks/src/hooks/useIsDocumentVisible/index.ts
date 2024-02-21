import React from 'react';

/**
 * useIsDocumentVisible() - Hook to subscribe and return the document's visibility state using the `document.visibilityState` property.
 *
 * @returns {boolean} Returns a boolean indicating whether the document is currently visible.
 *
 * @example
 * import React from 'react';
 * import { useCounter , useIsDocumentVisible } from '@abhushanaj/react-hooks';
 *
 * // Usage example to count the number of times the tab away action was done
 * const ExampleComponent = () => {
 *   const [tabAwayCount, { increment }] = useCounter(0);
 *   const isVisible = useIsDocumentVisible();
 *
 *   React.useEffect(() => {
 *     if (!isVisible) {
 *       increment();
 *     }
 *   }, [isVisible]);
 *
 *   return (
 *     <div>
 *       <p>Tab Away Count: {tabAwayCount}</p>
 *     </div>
 *   );
 * };
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
