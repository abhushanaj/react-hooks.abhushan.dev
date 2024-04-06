import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useCycleOn } from '.';

describe('useCycleOn() hook', () => {
	const intialItems = ['Msg1', 'Mgs2', 'Msg3'];
	const emptyInitialValues = [] as unknown[];

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useCycleOn).toBeDefined();
	});

	// active index
	describe('should yield initial activeIndex correctly', () => {
		it('zero on inital render', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ values }) => useCycleOn(values), {
				initialProps: {
					values: emptyInitialValues
				}
			});

			expect(result.current[1].activeIndex).toBe(0);
		});
	});

	// reset
	it('should set activeIndex to 0 on reset action', () => {
		expect.hasAssertions();
		const { result } = renderHook(({ values }) => useCycleOn(values), {
			initialProps: {
				values: intialItems
			}
		});

		act(() => {
			result.current[1].reset();
		});

		expect(result.current[1].activeIndex).toBe(0);
	});

	// forward action
	describe('should update activeIndex correctly on forward action', () => {
		it('increments by 1 until end', () => {
			const { result } = renderHook(({ values }) => useCycleOn(values), {
				initialProps: {
					values: intialItems
				}
			});

			act(() => {
				result.current[1].forward();
			});

			expect(result.current[1].activeIndex).toBe(1);
		});

		it('increments by 1 and cycles back to 0 after end', () => {
			const { result } = renderHook(({ values }) => useCycleOn(values), {
				initialProps: {
					values: intialItems
				}
			});

			act(() => {
				intialItems.forEach(() => {
					result.current[1].forward();
				});
			});

			expect(result.current[1].activeIndex).toBe(0);
		});
	});

	// backward action
	describe('should update activeIndex correctly on backward action', () => {
		it('decrements by 1 until start', () => {
			const { result } = renderHook(({ values }) => useCycleOn(values), {
				initialProps: {
					values: intialItems
				}
			});

			act(() => {
				result.current[1].forward();
				result.current[1].backward();
			});

			expect(result.current[1].activeIndex).toBe(0);
		});

		it('decrement by 1 and cycles from back to 0 after end', () => {
			const { result } = renderHook(({ values }) => useCycleOn(values), {
				initialProps: {
					values: intialItems
				}
			});

			act(() => {
				result.current[1].backward();
			});

			expect(result.current[1].activeIndex).toBe(intialItems.length - 1);
		});
	});
});
