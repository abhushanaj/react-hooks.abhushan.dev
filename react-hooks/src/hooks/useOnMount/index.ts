import React from 'react';

/**
 * useOnMount() - Custom react hook that invokes the provided callback function after the component is mounted.
 * @see - https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useonmount/
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
