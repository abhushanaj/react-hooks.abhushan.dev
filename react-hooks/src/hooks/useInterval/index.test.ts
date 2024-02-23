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
		it('with default delay ("immediate") when not specified', () => {
			expect.hasAssertions();
			const cb = vi.fn();

			renderHook(({ callback }) => useInterval(callback), {
				initialProps: {
					callback: cb
				}
			});

			act(() => {
				vi.advanceTimersByTime(1);
			});
			expect(cb).toHaveBeenCalledTimes(1);
		});

		it('with custom delay (ms) when  specified', () => {
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
	});
});
