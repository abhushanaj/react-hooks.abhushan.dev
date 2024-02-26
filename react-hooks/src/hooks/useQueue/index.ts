import React from 'react';

/**
 * useQueue(): Custom react hook for managing a queue of items.
 * @see - https://react-hooks.abhushan.dev/hooks/state/usequeue/
 */
export function useQueue<T>(initialQueue?: Array<T>) {
	const [queue, setQueue] = React.useState(initialQueue || []);

	const add = React.useCallback((newItem: T) => {
		setQueue((prev) => {
			prev[prev.length] = newItem;
			return prev.slice(0);
		});
	}, []);

	const clear = React.useCallback(() => {
		setQueue([]);
	}, []);

	const remove = React.useCallback(() => {
		let removedItem: T | undefined;

		setQueue((prev) => {
			const [firstItem, ...rest] = prev;
			removedItem = firstItem;
			return rest;
		});

		return removedItem;
	}, []);

	return [
		queue,
		{
			firstItem: queue[0],
			lastItem: queue[queue.length - 1],
			size: queue.length,
			add,
			clear,
			remove
		}
	] as const;
}
