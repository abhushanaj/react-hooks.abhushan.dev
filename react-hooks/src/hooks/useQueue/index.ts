import React from 'react';

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

	return [
		queue,
		{
			firstItem: queue[0],
			lastItem: queue[queue.length - 1],
			size: queue.length,
			add,
			clear
		}
	] as const;
}
