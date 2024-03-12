import React from 'react';

export function useStack<T>(initialValue: Array<T>) {
	const [stack, setStack] = React.useState(initialValue);

	const clear = React.useCallback(() => {
		setStack([]);
	}, []);

	const reset = React.useCallback(() => {
		setStack(initialValue);
	}, [initialValue]);

	const set = React.useCallback((newStack: Array<T>) => {
		setStack(newStack);
	}, []);

	const peek = React.useCallback(() => {
		if (stack.length === 0) {
			return undefined;
		}

		return stack[stack.length - 1];
	}, [stack]);

	const push = React.useCallback((item: T) => {
		setStack((prev) => {
			const newStack = prev.slice(0);
			newStack.push(item);
			return newStack;
		});
	}, []);

	return [
		stack,
		{
			clear,
			reset,
			set,
			peek,
			size: stack.length,
			push
		}
	] as const;
}
