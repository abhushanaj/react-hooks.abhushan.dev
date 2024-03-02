import React from 'react';

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

export type UseOuterWindowSizeResult = {
	width: number | null;
	height: number | null;
};

/**
 * useOuterWindowSize() - Custom react hook to get the values of `window.outerWidth` and `window.outerHeight`. It also subscribes to the resize event to get latest values.
 * @see - https://react-hooks.abhushan.dev/hooks/window/useouterwindowsize/
 *
 */
export function useOuterWindowSize() {
	const [dimensions, setDimensions] = React.useState<UseOuterWindowSizeResult>({
		width: null,
		height: null
	});

	useIsomorphicLayoutEffect(() => {
		const updateDimenions = () => {
			setDimensions({
				width: window.outerWidth,
				height: window.outerHeight
			});
		};

		// first render values
		updateDimenions();

		window.addEventListener('resize', updateDimenions);

		return () => {
			window.removeEventListener('resize', updateDimenions);
		};
	}, []);

	return dimensions;
}
