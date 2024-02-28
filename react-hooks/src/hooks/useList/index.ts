import React from 'react';

export function useList<T>(initialList?: Array<T>) {
	const [list, setList] = React.useState(initialList || []);

	const set = React.useCallback((newList: Array<T>) => {
		setList(newList);
	}, []);

	const reset = React.useCallback(() => {
		setList(initialList || []);
	}, [initialList]);

	return [list, { reset, set, firstItem: list[0], lastItem: list[list.length - 1] }] as const;
}