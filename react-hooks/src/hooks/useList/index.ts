import React from 'react';

/**
 * useList() - Custom react hook to work with lists.
 * @see -  https://react-hooks.abhushan.dev/hooks/state/uselist/
 */
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

			// no changes if out of bounds
			if (normalizedIndex >= size || normalizedIndex < 0) {
				return prevList;
			}

			const listCopy = prevList.slice(0);
			listCopy.splice(normalizedIndex, 1);
			return listCopy;
		});
	}, []);

	const updateAt = React.useCallback((index: number, value: T) => {
		setList((prevList) => {
			const size = prevList.length;
			const normalizedIndex = index < 0 ? index + size : index;

			// no changes if out of bounds
			if (normalizedIndex >= size || normalizedIndex < 0) {
				return prevList;
			}

			prevList[normalizedIndex] = value;
			const listCopy = prevList.slice(0);
			return listCopy;
		});
	}, []);

	const insertAt = React.useCallback((index: number, value: T) => {
		setList((prevList) => {
			const size = prevList.length;
			let normalizedIndex = index < 0 ? index + size : index;

			// out of bounds on negative side insert at first index
			if (normalizedIndex < 0) {
				normalizedIndex = 0;
			}

			prevList[normalizedIndex] = value;
			return prevList.slice(0);
		});
	}, []);

	return [
		list,
		{
			reset,
			set,
			firstItem: list[0],
			lastItem: list[list.length - 1],
			size: list.length,
			valueAt,
			clear,
			removeAt,
			updateAt,
			insertAt
		}
	] as const;
}
