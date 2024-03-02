import React from 'react';

import { noop } from '../../utils';

/**
 * useIsClient() - Custom react hook which returns a boolean flag to indicate on whether the component was running on client side or not.
 */

export function useIsClient() {
	const subscribe = React.useCallback(() => {
		return noop;
	}, []);

	const snapshot = React.useCallback(() => true, []);

	const serverSnapshot = React.useCallback(() => false, []);

	return React.useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
