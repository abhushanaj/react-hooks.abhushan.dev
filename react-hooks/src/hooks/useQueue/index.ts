import React from 'react';

/**
 * useQueue: Custom React hook for managing a queue of items.
 *
 * @template T - The type of items in the queue.
 * @param {Array<T>} [initialQueue] - Initial array of items for the queue.
 * @returns {[Array<T>, {
 *    firstItem: T | undefined,
 *    lastItem: T | undefined,
 *    size: number,
 *    add: (newItem: T) => void,
 *    clear: () => void,
 *    remove: () => T | undefined
 * }]} - A tuple containing the current queue array and an object with utility functions.
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