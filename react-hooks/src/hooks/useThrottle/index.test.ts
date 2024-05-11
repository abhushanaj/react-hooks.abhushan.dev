import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useThrottle } from '.';

describe('useThrottle() hook', () => {
	const defaultDuration = 1000;

	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useThrottle).toBeDefined();
	});

	it('should return a function as first argument', () => {
		const { result } = renderHook(() => useThrottle(() => {}, defaultDuration));
		expect.hasAssertions();
		expect(result.current[0]).toBeTypeOf('function');
	});

	it('should throw error when duration is negative value', () => {
		expect.hasAssertions();
		expect(() => {
			renderHook(() => useThrottle(() => {}, -10));
		}).toThrowError();
	});

	it('should invoke with correct arguments', () => {
		expect.hasAssertions();

		const mockedCb = vi.fn((a: number, b: number) => a + b);

		// @ts-expect-error : Types mismatch for mocked function vs expected callback
		const { result } = renderHook(({ fn, duration }) => useThrottle(fn, duration), {
			initialProps: {
				fn: mockedCb,
				duration: defaultDuration
			}
		});

		act(() => {
			result.current[0](2, 3);
		});

		expect(mockedCb).toBeCalledWith(2, 3);
	});

	describe('duration (ms) should work', () => {
		it('should invoke callback immediately', () => {
			expect.hasAssertions();

			const mockedCb = vi.fn();

			const { result } = renderHook(({ fn, duration }) => useThrottle(fn, duration), {
				initialProps: {
					fn: mockedCb,
					duration: defaultDuration
				}
			});

			act(() => {
				result.current[0]();
			});

			expect(mockedCb).toBeCalledTimes(1);
		});

		it('should invoke only once within duration (ms) period', () => {
			expect.hasAssertions();

			const mockedCb = vi.fn();

			const { result } = renderHook(({ fn, duration }) => useThrottle(fn, duration), {
				initialProps: {
					fn: mockedCb,
					duration: defaultDuration
				}
			});

			act(() => {
				// invoking multiple times should have no effect within the duration period
				result.current[0]();
				result.current[0]();
				result.current[0]();
			});

			expect(mockedCb).toBeCalledTimes(1);
		});

		it('should be throttled over a period of duration (ms) continuously', () => {
			expect.hasAssertions();

			const mockedCb = vi.fn();

			const { result } = renderHook(({ fn, duration }) => useThrottle(fn, duration), {
				initialProps: {
					fn: mockedCb,
					duration: defaultDuration
				}
			});

			act(() => {
				result.current[0]();
				vi.advanceTimersByTime(defaultDuration);
				result.current[0]();
				vi.advanceTimersByTime(defaultDuration);
				result.current[0]();
				result.current[0]();
			});

			expect(mockedCb).toBeCalledTimes(3);
		});
	});

	describe('cancel should work', () => {
		it('should reset the throttling duration and immediately invoke again after cancellation', () => {
			expect.hasAssertions();

			const mockedCb = vi.fn();

			const { result } = renderHook(({ fn, duration }) => useThrottle(fn, duration), {
				initialProps: {
					fn: mockedCb,
					duration: defaultDuration
				}
			});

			act(() => {
				result.current[0]();
				result.current[1].cancel();
				result.current[0]();
			});

			expect(mockedCb).toBeCalledTimes(2);
		});
	});
});
