import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebounce } from '.';

describe('useDebounce() hook', () => {
	const defaultWaitTime = 1000;

	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useDebounce).toBeDefined();
	});

	it('should return a function', () => {
		expect.hasAssertions();
		const mockedCb = vi.fn();

		const { result } = renderHook(({ fn, wait }) => useDebounce(fn, wait), {
			initialProps: {
				fn: mockedCb,
				wait: defaultWaitTime
			}
		});

		expect(result.current[0]).toBeTypeOf('function');
	});

	it('should invoke with correct arguments', () => {
		expect.hasAssertions();

		const mockedCb = vi.fn((a: number, b: number) => a + b);

		// @ts-expect-error : Types mismatch for mocked function vs expected callback
		const { result } = renderHook(({ fn, wait }) => useDebounce(fn, wait), {
			initialProps: {
				fn: mockedCb,
				wait: defaultWaitTime
			}
		});

		act(() => {
			result.current[0](2, 3);
			vi.advanceTimersByTime(defaultWaitTime);
		});

		expect(mockedCb).toBeCalledWith(2, 3);
	});

	describe('cancels the pending invocations correctly', () => {
		it('when hook unmounts', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			const { result, unmount } = renderHook(({ fn, wait }) => useDebounce(fn, wait), {
				initialProps: {
					fn: mockedCb,
					wait: defaultWaitTime
				}
			});

			act(() => {
				result.current[0]();
			});

			unmount();

			expect(mockedCb).not.toBeCalled();
		});

		it('when cancel method is invoked', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			const { result } = renderHook(({ fn, wait }) => useDebounce(fn, wait), {
				initialProps: {
					fn: mockedCb,
					wait: defaultWaitTime
				}
			});

			act(() => {
				result.current[0]();
				vi.advanceTimersByTime(defaultWaitTime / 1000);
			});

			expect(mockedCb).not.toBeCalled();
		});

		it('when debounced fn is called again before wait is over', () => {
			expect.hasAssertions();
			const mockedCb = vi.fn();

			const { result } = renderHook(({ fn, wait }) => useDebounce(fn, wait), {
				initialProps: {
					fn: mockedCb,
					wait: defaultWaitTime
				}
			});

			act(() => {
				result.current[0]();
				result.current[0]();

				vi.advanceTimersByTime(defaultWaitTime);
			});

			expect(mockedCb).toBeCalledTimes(1);
		});
	});

	describe('delays execution of the function until (ms)', () => {
		it('should not invoke until wait time is over', () => {
			const mockedCb = vi.fn();
			expect.hasAssertions();

			const { result } = renderHook(({ fn, wait }) => useDebounce(fn, wait), {
				initialProps: {
					fn: mockedCb,
					wait: defaultWaitTime
				}
			});

			act(() => {
				result.current[0]();
				vi.advanceTimersByTime(defaultWaitTime / 2);
			});

			expect(mockedCb).not.toBeCalledTimes(1);
		});

		it('should invoke after wait time is over', () => {
			const mockedCb = vi.fn();
			expect.hasAssertions();

			const { result } = renderHook(({ fn, wait }) => useDebounce(fn, wait), {
				initialProps: {
					fn: mockedCb,
					wait: defaultWaitTime
				}
			});

			act(() => {
				result.current[0]();
				vi.advanceTimersByTime(defaultWaitTime);
			});

			expect(mockedCb).toBeCalledTimes(1);
		});
	});
});
