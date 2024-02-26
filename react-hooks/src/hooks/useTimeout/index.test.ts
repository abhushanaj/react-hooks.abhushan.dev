import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTimeout } from '.';

describe('useTimeout() hook', () => {
	const defaultTimeout = 1_000;

	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useTimeout).toBeDefined();
	});

	// cancels the timeout
	describe('should cancel the timeout', () => {
		it('immediately when called', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			const { result } = renderHook(({ callback }) => useTimeout(callback), {
				initialProps: {
					callback: mockedCb
				}
			});

			act(() => {
				result.current[0]();
			});

			expect(mockedCb).not.toHaveBeenCalled();
		});

		it('after the timeout period is over', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			renderHook(({ callback, delay }) => useTimeout(callback, delay), {
				initialProps: {
					callback: mockedCb,
					delay: defaultTimeout
				}
			});

			// we advance time by defaultTimeout
			act(() => {
				vi.advanceTimersByTime(defaultTimeout);
			});

			expect(mockedCb).toHaveBeenCalledTimes(1);
		});

		it('before the timneout period is over', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			const { result } = renderHook(({ callback, delay }) => useTimeout(callback, delay), {
				initialProps: {
					callback: mockedCb,
					delay: defaultTimeout
				}
			});

			// we advance time by defaultTimeout/2
			act(() => {
				vi.advanceTimersByTime(Math.floor(defaultTimeout / 2));
			});

			// we cancel the timer before even timeout was executed
			act(() => {
				result.current[0]();
			});

			expect(mockedCb).not.toHaveBeenCalled();

			// we advance time by defaultTimeout anc check it was still not invoked
			act(() => {
				vi.advanceTimersByTime(defaultTimeout);
			});

			expect(mockedCb).not.toHaveBeenCalled();
		});
	});

	// invoking the callback
	describe('should invoke the callback correctly', () => {
		it('immediately when no delay is passed', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			renderHook(({ callback }) => useTimeout(callback), {
				initialProps: {
					callback: mockedCb
				}
			});

			// advance timer by 100ms
			act(() => {
				vi.advanceTimersByTime(100);
			});

			expect(mockedCb).toHaveBeenCalledTimes(1);
		});

		it('after a minimum wait of "delay (ms)" when delay is passed', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			renderHook(({ callback, delay }) => useTimeout(callback, delay), {
				initialProps: {
					callback: mockedCb,
					delay: defaultTimeout
				}
			});

			// advance timer by 1000ms (timeout delay)
			act(() => {
				vi.advanceTimersByTime(defaultTimeout);
			});

			expect(mockedCb).toHaveBeenCalledTimes(1);
		});

		it('after a minimum wait of "delay (ms)" and only once', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			renderHook(({ callback, delay }) => useTimeout(callback, delay), {
				initialProps: {
					callback: mockedCb,
					delay: defaultTimeout
				}
			});

			expect(mockedCb).not.toHaveBeenCalled();

			// advance timer by 1000ms (timeout delay)
			act(() => {
				vi.advanceTimersByTime(defaultTimeout);
			});

			expect(mockedCb).toHaveBeenCalledTimes(1);

			act(() => {
				vi.advanceTimersByTime(defaultTimeout);
			});
			expect(mockedCb).toHaveBeenCalledTimes(1);
		});
	});
});
