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
			const advancedFactor = 3;
			const afterRerenderDelay = 500;

			const { rerender } = renderHook(({ callback, duration }) => useIntervalWhen(callback, duration), {
				initialProps: {
					callback: mockedCb,
					duration: defaultDuration
				}
			});

			// we advance time  by 1000*3 =3000ms
			act(() => {
				vi.advanceTimersByTime(defaultDuration * advancedFactor);
			});

			const expectedCalls = Math.floor((defaultDuration * advancedFactor) / defaultDuration);

			// we expect the callback to be invoked 3 times
			expect(mockedCb).toHaveBeenCalledTimes(expectedCalls);

			// we change the delay to be 500ms
			rerender({
				callback: mockedCb,
				duration: afterRerenderDelay
			});

			// we advance time to be 500* 5 = 2500ms
			act(() => {
				vi.advanceTimersByTime(afterRerenderDelay * advancedFactor);
			});

			const newExpectedCalls = Math.floor((afterRerenderDelay * advancedFactor) / afterRerenderDelay);

			expect(mockedCb).toHaveBeenCalledTimes(newExpectedCalls + expectedCalls);
		});
	});

	// usage with "immediate" flag
	it('should invoke immediately and in durations (ms) specified', () => {
		expect.hasAssertions();

		const advancedFactor = 3;

		renderHook(({ callback, duration, immediate }) => useIntervalWhen(callback, duration, immediate), {
			initialProps: {
				callback: mockedCb,
				duration: defaultDuration,
				immediate: true
			}
		});

		// as immediate flag is passed
		expect(mockedCb).toHaveBeenCalledTimes(1);

		// increase by 1000*3, so should be called 3 times
		act(() => {
			vi.advanceTimersByTime(defaultDuration * advancedFactor);
		});

		// we expect one call to happen immediately and then other calls after durations
		expect(mockedCb).toHaveBeenCalledTimes(advancedFactor + 1);
	});

	// usage with "when" flag
	describe('should respect the when flag', () => {
		it('should not invoke callback when set as false', () => {
			expect.hasAssertions();

			renderHook(({ callback, duration, immediate }) => useIntervalWhen(callback, duration, immediate), {
				initialProps: {
					callback: mockedCb,
					duration: defaultDuration,
					immediate: false,
					when: false
				}
			});

			// as when flag is passed as false
			expect(mockedCb).not.toHaveBeenCalled();
		});

		it('should resume to invoke callback when set as true after', () => {
			expect.hasAssertions();

			const { rerender } = renderHook(
				({ callback, duration, immediate }) => useIntervalWhen(callback, duration, immediate),
				{
					initialProps: {
						callback: mockedCb,
						duration: defaultDuration,
						immediate: false,
						when: false
					}
				}
			);

			rerender({
				callback: mockedCb,
				duration: defaultDuration,
				immediate: false,
				when: true
			});

			act(() => {
				vi.advanceTimersByTime(defaultDuration);
			});

			expect(mockedCb).toHaveBeenCalled();
		});
	});
});
