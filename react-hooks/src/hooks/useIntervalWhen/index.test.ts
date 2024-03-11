import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useIntervalWhen } from '.';

describe('useIntervalWhen() hook', () => {
	const defaultDuration = 1_000;
	const mockedCb = vi.fn();

	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.resetAllMocks();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useIntervalWhen).toBeDefined();
	});

	// cancellation of timer
	describe('should cancel the interval', () => {
		it('immediately', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ callback, duration }) => useIntervalWhen(callback, duration), {
				initialProps: {
					callback: mockedCb,
					duration: defaultDuration
				}
			});

			act(() => {
				result.current[0]();
			});

			expect(mockedCb).not.toBeCalled();
		});

		it('after a duration immediately', () => {
			expect.hasAssertions();

			const { result } = renderHook(({ callback, duration }) => useIntervalWhen(callback, duration), {
				initialProps: {
					callback: mockedCb,
					duration: defaultDuration
				}
			});

			act(() => {
				vi.advanceTimersByTime(defaultDuration);
			});

			act(() => {
				result.current[0]();
			});

			expect(mockedCb).toBeCalledTimes(1);
		});
	});

	// invokes the callback correctly
	describe('should invoke the callback in durations (ms)', () => {
		it('with custom duration (ms) when specified', () => {
			expect.hasAssertions();

			const advancedFactor = 3;

			renderHook(({ callback, duration }) => useIntervalWhen(callback, duration), {
				initialProps: {
					callback: mockedCb,
					duration: defaultDuration
				}
			});

			// increase by 1000*3, so should be called 3 times
			act(() => {
				vi.advanceTimersByTime(defaultDuration * advancedFactor);
			});
			expect(mockedCb).toHaveBeenCalledTimes(advancedFactor);
		});

		it('with new duration (ms) passed during a re-render', () => {
			expect.hasAssertions();
			const cb = vi.fn();
			const advancedFactor = 3;
			const afterRerenderDelay = 500;

			const { rerender } = renderHook(({ callback, duration }) => useIntervalWhen(callback, duration), {
				initialProps: {
					callback: cb,
					duration: defaultDuration
				}
			});

			// we advance time  by 1000*3 =3000ms
			act(() => {
				vi.advanceTimersByTime(defaultDuration * advancedFactor);
			});

			const expectedCalls = Math.floor((defaultDuration * advancedFactor) / defaultDuration);

			// we expect the callback to be invoked 3 times
			expect(cb).toHaveBeenCalledTimes(expectedCalls);

			// we change the delay to be 500ms
			rerender({
				callback: cb,
				duration: afterRerenderDelay
			});

			// we advance time to be 500* 5 = 2500ms
			act(() => {
				vi.advanceTimersByTime(afterRerenderDelay * advancedFactor);
			});

			const newExpectedCalls = Math.floor((afterRerenderDelay * advancedFactor) / afterRerenderDelay);

			expect(cb).toHaveBeenCalledTimes(newExpectedCalls + expectedCalls);
		});
	});
});
