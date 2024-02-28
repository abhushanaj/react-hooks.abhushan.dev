import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useList } from '.';

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
		it('wne no list is passed, defaults to empty list', () => {
			const { result } = renderHook(() => useList());

			const updatedNewList = emptyList.concat('Test 2');

			act(() => {
				result.current[1].set(updatedNewList);
			});

			expect(result.current[0]).toEqual(updatedNewList);
		});

		it('when the list state is empty', () => {
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
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			expect(result.current[1].firstItem).toEqual(emptyList.shift());
		});

		it('when the list is non-empty', () => {
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
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			expect(result.current[1].lastItem).toEqual(emptyList.pop());
		});

		it('when the list is non-empty', () => {
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
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			expect(result.current[1].valueAt(0)).toEqual(emptyList[0]);
		});

		it('when the list is non-empty', () => {
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			expect(result.current[1].valueAt(0)).toEqual(dataList[0]);
		});

		it('when negative index is passed', () => {
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
		it('when list is empty', () => {
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: emptyList
				}
			});

			act(() => {
				result.current[1].removeAt(0);
			});

			expect(result.current[0]).toEqual(emptyList);
		});

		it('when list is non-empty and index is not out of bounds', () => {
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const index = 0;
			act(() => {
				result.current[1].removeAt(index);
			});

			const filteredList = dataList.filter((_, ind) => ind !== index);

			expect(result.current[0]).toEqual(filteredList);
		});

		it('when list is non-empty and index is negative and not out of bounds', () => {
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const index = -1;
			act(() => {
				result.current[1].removeAt(index);
			});

			const filteredList = dataList.filter((_, ind) => ind !== dataList.length + index);

			expect(result.current[0]).toEqual(filteredList);
		});

		it('when index is out of bounds (positive or negative', () => {
			const { result } = renderHook(({ initialList }) => useList(initialList), {
				initialProps: {
					initialList: dataList
				}
			});

			const index = -10;
			act(() => {
				result.current[1].removeAt(index);
			});

			const filteredList = dataList.filter((_, ind) => ind !== dataList.length + index);

			expect(result.current[0]).toEqual(filteredList);
			expect(result.current[0]).toEqual(dataList);
		});
	});
});
