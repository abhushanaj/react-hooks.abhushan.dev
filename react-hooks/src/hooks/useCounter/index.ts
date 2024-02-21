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
/**
 * useCounter() hook - Manage a custom counter with min, max, and stepper values
 * @param {number} initialCount - Initial value of the counter to keep track of
 * @param {UseCounterOptions} options - Configuration options for the useCounter
 * @property {number} options.step - Increment/decrement step value (default: 1)
 * @property {number} options.min - Minimum value for the counter (default: -Infinity)
 * @property {number} options.max - Maximum value for the counter (default: Infinity)
 * @returns {[number, { increment: () => void, decrement: () => void, set: (newCount: number) => void, reset: () => void }]} - A tuple containing the current count and an object with functions to manipulate the counter
 * @example
 * // Example usage of useCounter hook
 * function CounterComponent() {
 *   // Setting up initial count with options
 *   const initialCount = 0;
 *   const options: UseCounterOptions = {
 *     step: 2,
 *     min: -5,
 *     max: 10
 *   };
 *
 *   // Using the useCounter hook
 *   const [count, { increment, decrement, set, reset }] = useCounter(initialCount, options);
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={increment}>Increment</button>
 *       <button onClick={decrement}>Decrement</button>
 *       <button onClick={() => set(5)}>Set to 5</button>
 *       <button onClick={reset}>Reset</button>
 *     </div>
 *   );
 * }
 *
 * export default CounterComponent;
 */
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
