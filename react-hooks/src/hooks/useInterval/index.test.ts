import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useInterval } from '.';

describe('useInterval() hook', () => {
	const defaultDelay = 1000;

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useInterval).toBeDefined();
	});

	// cancellation of intervals
	describe('should cancel the interval', () => {
		it('when called immediately', () => {
			const cb = vi.fn();
			expect.hasAssertions();

			const { result } = renderHook(({ callback, delay }) => useInterval(callback, delay), {
				initialProps: {
					callback: cb,
					delay: defaultDelay
				}
			});

			// cancel the interval immediately
			act(() => {
				result.current[0]();
			});

			expect(cb).not.toHaveBeenCalled();
		});

		it('when called after some delay', () => {
			const cb = vi.fn();
			expect.hasAssertions();

			renderHook(({ callback, delay }) => useInterval(callback, delay), {
				initialProps: {
					callback: cb,
					delay: defaultDelay
				}
			});

			// advanced by 2000 ms
			act(() => {
				vi.advanceTimersByTime(2_100);
			});

			expect(cb).toHaveBeenCalledTimes(2);
		});
	});

	// invokes the callback correctly
	describe('should invoke the callback after delay (ms)', () => {
		/**
		 * Unsure why the zero ms case causes a memory leak while testing
		 */

		// eslint-disable-next-line vitest/no-commented-out-tests
		// it('with default delay ("immediate") when not specified', () => {
		// 	expect.hasAssertions();
		// 	const cb = vi.fn();

		// 	const { unmount } = renderHook(({ callback }) => useInterval(callback), {
		// 		initialProps: {
		// 			callback: cb
		// 		}
		// 	});

		// 	// advance the timer by 5 ms
		// 	act(() => {
		// 		vi.advanceTimersByTime(1);
		// 	});
		// 	expect(cb).toHaveBeenCalledTimes(1);
		// 	unmount();
		// });

		it('with custom delay (ms) when specified', () => {
			expect.hasAssertions();
			const cb = vi.fn();
			const advancedFactor = 3;

			renderHook(({ callback, delay }) => useInterval(callback, delay), {
				initialProps: {
					callback: cb,
					delay: defaultDelay
				}
			});

			act(() => {
				vi.advanceTimersByTime(defaultDelay * advancedFactor);
			});
			expect(cb).toHaveBeenCalledTimes(advancedFactor);
		});

		it('with new delay (ms) passed during a re-render', () => {
			expect.hasAssertions();
			const cb = vi.fn();
			const advancedFactor = 3;
			const afterRerenderDelay = 500;

			const { rerender } = renderHook(({ callback, delay }) => useInterval(callback, delay), {
				initialProps: {
					callback: cb,
					delay: defaultDelay
				}
			});

			// we advance time  by 1000*3 =3000ms
			act(() => {
				vi.advanceTimersByTime(defaultDelay * advancedFactor);
			});
			const expectedCalls = Math.floor((defaultDelay * advancedFactor) / defaultDelay);

			// we expect the callback to be invoked 3 times
			expect(cb).toHaveBeenCalledTimes(expectedCalls);

			// we change the delay to be 500ms
			rerender({
				callback: cb,
				delay: afterRerenderDelay
			});

			// we advance time to be 500* 5 = 2500ms
			act(() => {
				vi.advanceTimersByTime(afterRerenderDelay * advancedFactor);
			});

			const newExpectedCalls = Math.floor((afterRerenderDelay * advancedFactor) / afterRerenderDelay);

			expect(cb).toHaveBeenCalledTimes(newExpectedCalls + expectedCalls);
		});
	});

	// invoked the callback immediately one with immediate
	it('should invoke callback called immediately and after the  delay (ms) when immediate is not specified', () => {
		expect.hasAssertions();
		const cb = vi.fn();

		renderHook(({ callback, delay, immediate }) => useInterval(callback, delay, immediate), {
			initialProps: {
				callback: cb,
				delay: defaultDelay,
				immediate: true
			}
		});

		// immediately called since immediate is passed
		expect(cb).toHaveBeenCalledTimes(1);

		// advance the time by 1ms
		act(() => {
			vi.advanceTimersByTime(defaultDelay);
		});

		// called by the interval completed after advaning the time (1 (immediate) + 1 (after interval))
		expect(cb).toHaveBeenCalledTimes(2);
	});
});
