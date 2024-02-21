import React from 'react';

export type UseCounterOptions = {
	step?: number;
	min?: number;
	max?: number;
};

const defaultOptions: Required<UseCounterOptions> = {
	step: 1,
	max: Infinity,
	min: -Infinity
};

function checkAndThrowForOverflows(initialCount: number, min: number, max: number) {
	if (initialCount < min) {
		throw new Error('Initial count cannot be less than min set from options.min');
	}

	if (initialCount > max) {
		throw new Error('Initial count cannot be more than max set from options.max');
	}
}

export function useCounter(initialCount: number, options?: UseCounterOptions) {
	const [count, setCount] = React.useState(initialCount);

	const { step = 1, max = Infinity, min = -Infinity } = options || defaultOptions;

	checkAndThrowForOverflows(initialCount, min, max);

	const increment = React.useCallback(() => {
		setCount((prev) => Math.min(prev + step, max));
	}, [step, max]);

	const decrement = React.useCallback(() => {
		setCount((prev) => Math.max(prev - step, min));
	}, [step, min]);

	const set = React.useCallback(
		(newCount: number) => {
			checkAndThrowForOverflows(newCount, min, max);

			if (newCount != count) {
				setCount(newCount);
			}
		},
		[count, min, max]
	);

	const reset = React.useCallback(() => {
		setCount(initialCount);
	}, [initialCount]);

	return [count, { increment, decrement, set, reset }] as const;
}
