import React from 'react';

/**
 * useOnMount hook - Calls the provided callback function after the component is mounted.
 *
 * @param {() => void} callback - The callback function to be executed after component mount.
 *
 * @example
 * // Example usage of useOnMount hook
 * useOnMount(() => {
 *   console.log('Component is mounted!');
 *   // Additional initialization or side effects can be performed here
 * });
 */

export function useOnMount(callback: () => void) {
	React.useEffect(() => {
		// Invoke the callback function after the component is mounted
		callback();

		/**
		 * We are disabling this eslint rules as we don't want to synchronize the hook based on callback values.
		 * We only need to run it once and not in future updates (as we don't know whether the user will provide a stable reference of the callback)
		 */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
