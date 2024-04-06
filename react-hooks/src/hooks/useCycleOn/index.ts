import React from 'react';

/**
 * useCycleOn() - Custom react hook to cycle through a list of values.
 * @see - https://react-hooks.abhushan.dev/hooks/state/usecycleon/
 */
export const useCycleOn = <T>(values: Array<T>) => {
	const [activeIndex, setActiveIndex] = React.useState(0);

	const forward = React.useCallback(() => {
		setActiveIndex((prev) => {
			if (prev === values.length - 1) {
				return 0;
			} else {
				return prev + 1;
			}
		});
	}, [values.length]);

	const backward = React.useCallback(() => {
		setActiveIndex((prev) => {
			if (prev === 0) {
				return values.length - 1;
			} else {
				return prev - 1;
			}
		});
	}, [values.length]);

	const reset = React.useCallback(() => {
		setActiveIndex(0);
	}, []);

	return [
		values.at(activeIndex),
		{
			activeIndex,
			forward,
			backward,
			reset
		}
	] as const;
};
