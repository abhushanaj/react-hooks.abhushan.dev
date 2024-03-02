import React from 'react';

import { noop } from '../../utils';

/**
 * useWasSSR() - Custom react hook which returns a boolean flag to indicate on whether the component was SSR.
 */
export function useWasSSR() {
	const wasSSRRef = React.useRef<boolean>(false);

	const subscribe = React.useCallback(() => {
		return noop;
	}, []);

	const snapshot = React.useCallback(() => wasSSRRef.current, []);

	const serverSnapshot = React.useCallback(() => (wasSSRRef.current = true), []);

	return React.useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
