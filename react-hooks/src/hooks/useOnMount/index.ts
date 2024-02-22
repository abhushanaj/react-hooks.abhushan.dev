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
	const callbackRef = React.useRef(callback);

	React.useEffect(() => {
		// Invoke the callback function after the component is mounted
		callbackRef.current();
	}, []);
}
