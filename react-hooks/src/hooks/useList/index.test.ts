import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useList } from '.';

/**
 * Probably replace them with some third party utility library
 */

function _updateList<T>(list: Array<T>, index: number, item: T) {
	const updatedList = list.map((value, i) => {
		if (index === i || index === i - list.length) {
			return item;
		}

		return value;
	});

	return updatedList;
}

function _removeFromList<T>(list: Array<T>, index: number) {
	const normalizedIndex = index < 0 ? index + list.length : index;
	const updatedList = list.filter((_, ind) => ind !== normalizedIndex);
	return updatedList;
}
describe('useList() hook', () => {
	let emptyList: unknown[] = [];
	let dataList: Array<string> = ['T1', 'T2'];

	afterEach(() => {
		emptyList = [];
		dataList = ['T1', 'T2'];
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useList).toBeDefined();
	});

	// state
	describe('should return the initial state correctly', () => {
		it('when list is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			expect(result.current[0]).toEqual(emptyList);
		});

		it('when list is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			expect(result.current[0]).toEqual(dataList);
		});
	});

	// set
	describe('should set to a new state of the list', () => {
		it('when no list is passed, defaults to empty list', () => {
			expect.hasAssertions();

			const { result } = renderHook(() => useList());

			const updatedNewList = emptyList.concat('Test 2');

			act(() => {
				result.current[1].set(updatedNewList);
			});

			expect(result.current[0]).toEqual(updatedNewList);
		});

		it('when the list state is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			const updatedNewList = emptyList.concat('Test 2');

			act(() => {
				result.current[1].set(updatedNewList);
			});

			expect(result.current[0]).toEqual(updatedNewList);
		});

		it('when the list state is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const updatedNewList = dataList.concat('Test 2');

			act(() => {
				result.current[1].set(updatedNewList);
			});

			expect(result.current[0]).toEqual(updatedNewList);
		});
	});

	// reset
	describe('should reset to initial state of the list', () => {
		it('when the list is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			act(() => {
				const updatedNewList = emptyList.concat('Test 2');
				result.current[1].set(updatedNewList);
				result.current[1].reset();
			});

			expect(result.current[0]).toEqual(emptyList);
		});

		it('when the list state is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			act(() => {
				const updatedNewList = dataList.concat('Test 2');
				result.current[1].set(updatedNewList);
				result.current[1].reset();
			});

			expect(result.current[0]).toEqual(dataList);
		});
	});

	// firstItem
	describe('should yield the correct first item or undefined', () => {
		it('when the list is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			expect(result.current[1].firstItem).toEqual(emptyList.shift());
		});

		it('when the list is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			expect(result.current[1].firstItem).toEqual(dataList.shift());
		});
	});

	// lastItem
	describe('should yield the correct last item or undefined', () => {
		it('when the list is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			expect(result.current[1].lastItem).toEqual(emptyList.pop());
		});

		it('when the list is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			expect(result.current[1].lastItem).toEqual(dataList.pop());
		});
	});

	// valueAt
	describe('should return the right value at an index else undefined', () => {
		it('when the list is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			expect(result.current[1].valueAt(0)).toEqual(emptyList[0]);
		});

		it('when the list is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			expect(result.current[1].valueAt(0)).toEqual(dataList[0]);
		});

		it('when negative index is passed', () => {
			expect.hasAssertions();

			const filledList = dataList.concat(['Test 2', 'Test 3', 'Test 4']);
			const size = filledList.length;

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: filledList
				}
			});

			let index = -1;

			expect(result.current[1].valueAt(index)).toEqual(filledList[index + size]);

			index = -8;
			expect(result.current[1].valueAt(index)).toEqual(filledList[index + size]);
		});
	});

	// clear
	it('should clear the list back to empty state', () => {
		expect.hasAssertions();

		const { result } = renderHook(({ initialList }) => useList(initialList), {
			initialProps: {
				initialList: dataList
			}
		});

		act(() => {
			result.current[1].clear();
		});

		expect(result.current[0]).toEqual(emptyList);
	});

	// removeAt
	describe('should remove the item at the index', () => {
		it('with positive inbounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const removeIndex = 0;

			act(() => {
				result.current[1].removeAt(removeIndex);
			});

			const filteredList = _removeFromList(dataList, removeIndex);

			expect(result.current[0]).toEqual(filteredList);
		});

		it('with negative inbounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const removeIndex = -1;

			act(() => {
				result.current[1].removeAt(removeIndex);
			});

			const filteredList = _removeFromList(dataList, removeIndex);

			expect(result.current[0]).toEqual(filteredList);
		});

		it('with positive out-of-bounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const removeIndex = 10;

			act(() => {
				result.current[1].removeAt(removeIndex);
			});

			expect(result.current[0]).toEqual(dataList);
		});

		it('with negative out-of-bounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const removeIndex = -10;

			act(() => {
				result.current[1].removeAt(removeIndex);
			});

			expect(result.current[0]).toEqual(dataList);
		});
	});

	// updateAt
	describe('should update the item at the index with given value', () => {
		it('with positive inbounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const updateIndex = 0;
			const updateItem = 'Updated Item';

			act(() => {
				result.current[1].updateAt(updateIndex, updateItem);
			});

			const updatedList = _updateList(dataList, updateIndex, updateItem);

			expect(result.current[0]).toEqual(updatedList);
		});

		it('with negative inbounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const updateIndex = -1;
			const updateItem = 'Updated Item';
			const updatedList = _updateList(dataList, updateIndex, updateItem);

			act(() => {
				result.current[1].updateAt(updateIndex, updateItem);
			});

			expect(result.current[0]).toEqual(updatedList);
		});

		it('with positive out-of-bounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const updateIndex = 10;
			const updateItem = 'Updated Item';

			act(() => {
				result.current[1].updateAt(updateIndex, updateItem);
			});

			expect(result.current[0]).toEqual(dataList);
		});

		it('with negative out-of-bounds index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const updateIndex = -10;
			const updateItem = 'Updated Item';

			act(() => {
				result.current[1].updateAt(updateIndex, updateItem);
			});

			expect(result.current[0]).toEqual(dataList);
		});
	});

	// insertAt
	describe('should should insert item at the specified index', () => {
		it('should generate sparse array when positive index is out of bounds', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const newValue = 'TNew';

			// out of bounds to generate sprase arrays
			const insertIndex = dataList.length + 2;

			act(() => {
				result.current[1].insertAt(insertIndex, newValue);
			});

			dataList[insertIndex] = newValue;

			expect(result.current[0]).toStrictEqual(dataList);
		});

		it('should insert at zero index if out of bounds for negative index', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const newValue = 'TNew';

			// out of bounds to generate sprase arrays
			const insertIndex = -dataList.length - 1;

			act(() => {
				result.current[1].insertAt(insertIndex, newValue);
			});

			// inserts are zero when negative out of bounds
			dataList[0] = newValue;

			expect(result.current[0]).toStrictEqual(dataList);
		});
	});

	// insertAt===updateAt when index are in bounds
	describe('insertAt behaves like updateAt for within bounds index', () => {
		it('when it is positive', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const newValue = 'TNew';

			// out of bounds to generate sprase arrays
			const insertIndex = 0;
			act(() => {
				result.current[1].insertAt(insertIndex, newValue);
			});

			dataList[insertIndex] = newValue;

			expect(result.current[0]).toStrictEqual(dataList);
		});

		it('when it is negative', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const newValue = 'TNew';

			// out of bounds to generate sprase arrays
			const insertIndex = -1;
			act(() => {
				result.current[1].insertAt(insertIndex, newValue);
			});

			// as -1 is last element
			dataList[dataList.length - 1] = newValue;

			expect(result.current[0]).toStrictEqual(dataList);
		});
	});
});
