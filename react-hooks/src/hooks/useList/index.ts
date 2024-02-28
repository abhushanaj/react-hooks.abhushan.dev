import React from 'react';

export function useList<T>(initialList?: Array<T>) {
	const [list, setList] = React.useState(initialList || []);

	const set = React.useCallback((newList: Array<T>) => {
		setList(newList);
	}, []);

	const reset = React.useCallback(() => {
		setList(initialList || []);
	}, [initialList]);

	const valueAt = React.useCallback(
		(index: number) => {
			const elem = list.at(index);
			return elem;
		},
		[list]
	);

	const clear = React.useCallback(() => {
		setList([]);
	}, []);

	const removeAt = React.useCallback((index: number) => {
		setList((prevList) => {
			const size = prevList.length;
			const normalizedIndex = index < 0 ? index + size : index;

			if (normalizedIndex >= size || normalizedIndex < 0) {
				return prevList;
			}

			const listCopy = prevList.slice(0);
			listCopy.splice(normalizedIndex, 1);
			return listCopy;
		});
	}, []);

	return [list, { reset, set, firstItem: list[0], lastItem: list[list.length - 1], valueAt, clear, removeAt }] as const;
}
