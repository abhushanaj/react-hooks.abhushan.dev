import React from 'react';

/**
 * useOnUnmount() - Custom react hook that invokes the provided callback function after the component is unmounted.
 * @see - https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useonunmount/
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
