import React from 'react';

/**
 * useFreshRef() - Custom react hook that returns a ref with the latest and fresh value passed to it preventing stale closure.
 * @see - https://react-hooks.abhushan.dev/hooks/utilities/usefreshref/
 */
export function useFreshRef<T>(value: T) {
	const valueRef = React.useRef(value);

	React.useEffect(() => {
		valueRef.current = value;
	});

	return valueRef;
}
