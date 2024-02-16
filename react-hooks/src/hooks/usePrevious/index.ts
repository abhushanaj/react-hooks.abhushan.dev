import React from 'react';

/**
 * Use the usePrevious hook to retrieve the previous value of a given variable.
 *
 * @template T - The type of the value being tracked.
 * @template U - The type of the defaultValue to return on first render (optional and can be undefined).
 * @param {T} value - The current value to track.
 * @param {U} [defaultValue] - The optional default value, used on the first render. Defaults to undefined
 * @returns {T|U} The previous value of the tracked variable.
 *
 * @example
 * // Example usage with a component
 * function MyComponent() {
 *   const [count, setCount] = React.useState(0);
 *   const previousCount = usePrevious(count, -1);
 *
 *   return (
 *     <div>
 *       <p>Current Count: {count}</p>
 *       <p>Previous Count: {previousCount}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 */
export function usePrevious<T, U extends undefined | T>(value: T, defaultValue?: U) {
	const currentValueRef = React.useRef<U extends T ? T : undefined>(defaultValue as never);

	React.useEffect(() => {
		if (value != currentValueRef.current) {
			currentValueRef.current = value as never;
		}
	}, [value]);

	return currentValueRef.current;
}
