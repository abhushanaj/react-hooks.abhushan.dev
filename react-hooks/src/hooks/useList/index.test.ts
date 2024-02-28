import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useList } from '.';

describe('useList() hook', () => {
	let emptyList: unknown[] = [];
	let dataList: Array<string> = ['Test Data 1'];

	afterEach(() => {
		emptyList = [];
		dataList = ['Test Data 1'];
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
});
