import React from 'react';

/**
 * useOnUnmount hook - Calls the provided callback function after the component is unmounted.
 *
 * @param {() => void} callback - The callback function to be executed after component unmount.
 *
 * @example
 * // Example usage of useOnUnmount hook
 * useOnUnmount(() => {
 *   console.log('Component is unmounted!');
 *   // Additional initialization or side effects can be performed here
 * });
 */

export function useOnUnmount(callback: () => void) {
	React.useEffect(() => {
		return callback;

		/**
		 * We are disabling this eslint rules as we don't want to synchronize the hook based on callback values.
		 * We only need to run it once and not in future updates (as we don't know whether the user will provide a stable reference of the callback)
		 */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
