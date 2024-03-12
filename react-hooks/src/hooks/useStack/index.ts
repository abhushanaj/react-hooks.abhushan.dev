import React from 'react';

export function useStack<T>(initialValue: Array<T>) {
	const [stack, setStack] = React.useState(initialValue);

	const clear = React.useCallback(() => {
		setStack([]);
	}, []);

	const reset = React.useCallback(() => {
		setStack(initialValue);
	}, [initialValue]);

	return [
		stack,
		{
			clear,
			reset
		}
	] as const;
}
