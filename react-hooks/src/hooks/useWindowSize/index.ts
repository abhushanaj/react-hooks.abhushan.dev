import React from 'react';

export type UseWindowSizeResult = {
	width: number | null;
	height: number | null;
};

/**
 * useWindowSize() - Custom react hook to get the dimensions(width and height) of the window. The hooks also gets the latest values based on the resize event.
 * @see - https://react-hooks.abhushan.dev/hooks/ui/usewindowsize/
 *
 */
export function useWindowSize() {
	const [dimensions, setDimensions] = React.useState<UseWindowSizeResult>({
		width: null,
		height: null
	});

	React.useLayoutEffect(() => {
		const setWindowDimensions = () => {
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		// for the first render
		setWindowDimensions();

		// for future updates based on screen resize event
		window.addEventListener('resize', setWindowDimensions);

		return () => {
			window.removeEventListener('resize', setWindowDimensions);
		};
	}, []);

	return dimensions;
}
