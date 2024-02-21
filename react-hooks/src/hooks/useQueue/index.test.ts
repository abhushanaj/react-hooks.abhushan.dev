import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useQueue } from '.';

describe('useQueue() hook', () => {
	let initialValuesOfQueue = [{ name: 'Abhushan' }, { name: 'React Hooks' }];
	const emptyQueue: unknown[] = [];

	beforeEach(() => {
		initialValuesOfQueue = [{ name: 'Abhushan' }];
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useQueue).toBeDefined();
	});

	it('returns empty queue when no initial queue is provided', () => {
		expect.hasAssertions();
		const { result } = renderHook(() => useQueue());
		expect(result.current[0].length).toBe(0);
		expect(result.current[0]).toEqual(emptyQueue);
	});

	it('returns queue with initial items filled, when provided', () => {
		expect.hasAssertions();
		const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
			initialProps: {
				initialQueue: initialValuesOfQueue
			}
		});
		expect(result.current[0].length).not.toBe(0);
		expect(result.current[0]).toEqual(initialValuesOfQueue);
	});

	// Tests for firstItem property
	describe('yields firstItem property on queue correctly', () => {
		it('returns undefined when queue is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: emptyQueue
				}
			});

			expect(result.current[1].firstItem).toBeUndefined();
		});

		it('returns correct item when queue has atleast one item', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: initialValuesOfQueue
				}
			});

			expect(result.current[1].firstItem).toEqual(initialValuesOfQueue[0]);
		});
	});

	// Tests for lastItem property
	describe('yields lastItem property on queue correctly', () => {
		it('returns undefined when queue is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: emptyQueue
				}
			});

			expect(result.current[1].lastItem).toBeUndefined();
		});

		it('returns correct item when queue has atleast one item', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: initialValuesOfQueue
				}
			});

			expect(result.current[1].lastItem).toEqual(initialValuesOfQueue[0]);
		});
	});

	it('first and last item should be same when queue has only length of one', () => {
		expect.hasAssertions();
		const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
			initialProps: {
				initialQueue: [initialValuesOfQueue[0]]
			}
		});

		expect(result.current[1].firstItem).toEqual(result.current[1].lastItem);
	});

	// Test for the size property
	describe('yields the correct size property', () => {
		it('when queue is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: emptyQueue
				}
			});

			expect(result.current[1].size).toBe(emptyQueue.length);
		});

		it('when queue is non-empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: initialValuesOfQueue
				}
			});

			expect(result.current[1].size).toBe(initialValuesOfQueue.length);
		});
	});

	// Test or the add method

	// Test for the remove method
});
