import React from 'react';

/**
 * usePrevious () - Custom react hook to retrieve the previous value of a given state value.
 * @see - https://react-hooks.abhushan.dev/hooks/state/useprevious/
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
