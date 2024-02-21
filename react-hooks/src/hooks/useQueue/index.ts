import React from 'react';

export function useQueue<T>(initialQueue?: Array<T>) {
	const [queue] = React.useState(initialQueue || []);

	return [
		queue,
		{
			firstItem: queue[0],
			lastItem: queue[queue.length - 1],
			size: queue.length
		}
	] as const;
}
