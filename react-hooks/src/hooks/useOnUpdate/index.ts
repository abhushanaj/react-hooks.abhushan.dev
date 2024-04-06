import React from 'react';

import { useOnMount } from '../useOnMount';
import { useOnUnmount } from '../useOnUnmount';

/**
 * useOnUpdate() - Custom react hook that invokes the provided callback when a component updates/re-renders.
 * @see - https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useonupdate/
 */
export const useOnUpdate = (callback: () => void) => {
	const initialRender = React.useRef(true);

	React.useEffect(() => {
		if (!initialRender.current) {
			callback();
		}
	});

	useOnMount(() => {
		initialRender.current = false;
	});

	useOnUnmount(() => {
		initialRender.current = true;
	});

	return null;
};
