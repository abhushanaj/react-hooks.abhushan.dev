import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useStack } from '.';

describe('useStack() hook', () => {
	const emptyStack = [] as string[];
	const filledStack = ['Item1', 'Item2'];

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useStack).toBeDefined();
	});

	// initial return value
	describe('should return the initial stack', () => {
		it('when it is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			expect(result.current[0]).toEqual(emptyStack);
		});

		it('when it is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			expect(result.current[0]).toEqual(filledStack);
		});
	});

	// clear method
	describe('should clear the stack to empty state', () => {
		it('when it is empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			act(() => {
				result.current[1].clear();
			});

			expect(result.current[0]).toEqual(emptyStack);
		});

		it('when it is non-empty', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			act(() => {
				result.current[1].clear();
			});

			expect(result.current[0]).toEqual(emptyStack);
		});
	});

	// reset method
	describe('should reset the stack to original initial value', () => {
		it('when stack is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			act(() => {
				result.current[1].reset();
			});

			expect(result.current[0]).toEqual(emptyStack);
		});

		it('when stack is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			act(() => {
				result.current[1].reset();
			});

			expect(result.current[0]).toEqual(filledStack);
		});
	});

	// set method
	describe('should set the stack to new stack state', () => {
		it('when the stack is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			const newStackState = ['Item4'];

			act(() => {
				result.current[1].set(newStackState);
			});

			expect(result.current[0]).toEqual(newStackState);
		});

		it('when the stack is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			const newStackState = ['Item4'];

			act(() => {
				result.current[1].set(newStackState);
			});

			expect(result.current[0]).toEqual(newStackState);
		});
	});

	// peek method
	describe('should return the latest item in stack', () => {
		it('when it is empty', () => {
			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			let peekedItem;

			act(() => {
				peekedItem = result.current[1].peek();
			});

			expect(peekedItem).toBeUndefined();
		});

		it('when it is non-empty', () => {
			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			let peekedItem;
			act(() => {
				peekedItem = result.current[1].peek();
			});

			expect(peekedItem).toBe(filledStack[filledStack.length - 1]);
		});
	});

	// push method
	describe('should add a new item to stack at the end', () => {
		it('when the stack is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			const addedItem = 'Item 4';

			act(() => {
				result.current[1].push(addedItem);
			});

			expect(result.current[0]).toEqual(emptyStack.concat(addedItem));
		});

		it('when the stack is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			const addedItem = 'Item 4';

			act(() => {
				result.current[1].push(addedItem);
			});

			expect(result.current[0]).toEqual(filledStack.concat(addedItem));
		});
	});

	// pop method
	describe('should remove the last item to stack from the stack and return the item', () => {
		it('when stack is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			let poppedItem;

			act(() => {
				poppedItem = result.current[1].pop();
			});

			expect(poppedItem).toBeUndefined();
		});

		it('when stack is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			let poppedItem;

			act(() => {
				poppedItem = result.current[1].pop();
			});

			expect(poppedItem).toBe(filledStack[filledStack.length - 1]);
		});
	});

	// size property
	describe('should return the correct size of stack', () => {
		it('when the stack is empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: emptyStack
				}
			});

			expect(result.current[1].size).toEqual(emptyStack.length);
		});

		it('when the stack is non-empty', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			expect(result.current[1].size).toEqual(filledStack.length);
		});

		it('when the push operation is performed', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			act(() => {
				result.current[1].push('New Item');
			});

			expect(result.current[1].size).toEqual(filledStack.length + 1);
		});

		it('when the pop operation is performed', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ initialValue }) => useStack(initialValue), {
				initialProps: {
					initialValue: filledStack
				}
			});

			act(() => {
				result.current[1].pop();
			});

			expect(result.current[1].size).toEqual(filledStack.length - 1);
		});
	});
});
