import React from 'react';

/**
 * useStack() - Custom react hook to manage a stack of items.
 * @see - https://react-hooks.abhushan.dev/hooks/state/usestack/
 */
export function useStack<T>(initialValue?: Array<T>) {
	const [stack, setStack] = React.useState(initialValue || []);

	const clear = React.useCallback(() => {
		setStack([]);
	}, []);

	const reset = React.useCallback(() => {
		setStack(initialValue || []);
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

	const pop = React.useCallback(() => {
		let poppedItem: T | undefined;

		setStack((prev) => {
			const newStack = prev.slice(0);
			poppedItem = newStack.pop();
			return newStack;
		});

		return poppedItem;
	}, []);

	return [
		stack,
		{
			clear,
			reset,
			set,
			peek,
			size: stack.length,
			push,
			pop
		}
	] as const;
}
