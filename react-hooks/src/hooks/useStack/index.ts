import React from 'react';

export function useStack<T>(initialValue: Array<T>) {
	const [stack, setStack] = React.useState(initialValue);

	const clear = React.useCallback(() => {
		setStack([]);
	}, []);

	return [
		stack,
		{
			clear
		}
	] as const;
}
