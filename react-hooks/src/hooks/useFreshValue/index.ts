import React from 'react';

/**
 * useFreshValue() - Custom react hook that returns a ref with the latest and fresh value passed to it preventing stale closure.
 * @param value
 * @returns
 */
export function useFreshValue<T>(value: T) {
	const valueRef = React.useRef(value);

	React.useEffect(() => {
		valueRef.current = value;
	});

	return valueRef;
}
