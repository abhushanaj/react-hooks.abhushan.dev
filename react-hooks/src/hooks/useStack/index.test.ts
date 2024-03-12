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
	describe('returns the initial stack', () => {
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
	describe('clears the stack to empty state', () => {
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
	describe('reset the stack to original initial value', () => {
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
});
