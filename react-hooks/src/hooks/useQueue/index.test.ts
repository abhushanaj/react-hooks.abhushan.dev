import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useQueue } from '.';

describe('useQueue() hook', () => {
	let initialValuesOfQueue = [{ name: 'Abhushan' }, { name: 'React Hooks' }];
	let emptyQueue: unknown[] = [];

	beforeEach(() => {
		initialValuesOfQueue = [{ name: 'Abhushan' }];
		emptyQueue = [];
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
	describe('add() updates the queue correctly', () => {
		it('when queue is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: emptyQueue
				}
			});

			const newItem = { name: 'New Item' };
			// item is added at the end
			const updatedQueue = [...emptyQueue, newItem];
			act(() => {
				result.current[1].add(newItem);
			});

			expect(result.current[0]).toEqual(updatedQueue);
			expect(result.current[1].lastItem).toEqual(newItem);
			expect(result.current[1].firstItem).toEqual(newItem);
			expect(result.current[1].size).toEqual(updatedQueue.length);
		});

		it('when queue is non-empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: initialValuesOfQueue
				}
			});

			const newItem = { name: 'New Item' };
			// item is added at the end
			const updatedQueue = [...initialValuesOfQueue, newItem];
			act(() => {
				result.current[1].add(newItem);
			});

			expect(result.current[0]).toEqual(updatedQueue);
			expect(result.current[1].lastItem).toEqual(newItem);
			expect(result.current[1].firstItem).toEqual(initialValuesOfQueue[0]);
			expect(result.current[1].size).toEqual(updatedQueue.length);
		});
	});

	// Test for the remove method
	describe('remove() updates the queue correctly', () => {
		it('when queue is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: emptyQueue
				}
			});

			act(() => {
				result.current[1].remove();
			});

			expect(result.current[0]).toEqual(emptyQueue);
			expect(result.current[1].lastItem).toEqual(emptyQueue[0]);
			expect(result.current[1].firstItem).toEqual(emptyQueue[0]);
			expect(result.current[1].size).toEqual(emptyQueue.length);
		});

		it('when queue is non-empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: initialValuesOfQueue
				}
			});

			let removedItem: unknown;

			act(() => {
				removedItem = result.current[1].remove();
			});

			expect(removedItem).toBe(initialValuesOfQueue[0]);
			expect(result.current[0]).toEqual(initialValuesOfQueue.slice(1));
		});
	});

	// Test or the clear method
	describe('clear() updates the queue correctly', () => {
		it('when queue is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: emptyQueue
				}
			});

			act(() => {
				result.current[1].clear();
			});

			expect(result.current[0]).toEqual(emptyQueue);
			expect(result.current[1].lastItem).toEqual(emptyQueue[0]);
			expect(result.current[1].firstItem).toEqual(emptyQueue[emptyQueue.length - 1]);
			expect(result.current[1].size).toEqual(emptyQueue.length);
		});

		it('when queue is non-empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: initialValuesOfQueue
				}
			});

			act(() => {
				result.current[1].clear();
			});

			expect(result.current[0]).toEqual(emptyQueue);
			expect(result.current[1].lastItem).toEqual(emptyQueue[0]);
			expect(result.current[1].firstItem).toEqual(emptyQueue[emptyQueue.length - 1]);
			expect(result.current[1].size).toEqual(emptyQueue.length);
		});
	});

	describe('first and last item should be same when', () => {
		it('queue is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: []
				}
			});

			expect(result.current[1].firstItem).toEqual(result.current[1].lastItem);
		});

		it('queue has only one empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: [initialValuesOfQueue[0]]
				}
			});

			expect(result.current[1].firstItem).toEqual(result.current[1].lastItem);
		});
	});

	// reset method
	describe('should reset the queue to initial queue', () => {
		it('when it is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: emptyQueue
				}
			});

			act(() => {
				result.current[1].reset();
			});

			expect(result.current[0]).toEqual(emptyQueue);
		});

		it('when it is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
				initialProps: {
					initialQueue: initialValuesOfQueue
				}
			});

			act(() => {
				result.current[1].add({ name: 'New Item' });
				result.current[1].reset();
			});

			expect(result.current[0]).toEqual(initialValuesOfQueue);
		});
	});

	// set method
	it('should set the queue to new queue provided', () => {
		expect.hasAssertions();

		const { result } = renderHook(({ initialQueue }) => useQueue(initialQueue), {
			initialProps: {
				initialQueue: initialValuesOfQueue
			}
		});

		const newQueue = [{ name: 'New Queue' }];
		act(() => {
			result.current[1].set(newQueue);
		});

		expect(result.current[0]).toEqual(newQueue);
	});
});
