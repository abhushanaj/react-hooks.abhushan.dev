import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useLimitCallback } from '.';

describe('useLimitCallback() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useLimitCallback).toBeDefined();
	});

	it('should limit calls to at most period value', () => {
		const mockedCb = vi.fn();

		const limitCount = 2;

		const { result } = renderHook(({ period, callback }) => useLimitCallback(callback, period), {
			initialProps: {
				period: limitCount,
				callback: mockedCb
			}
		});

		act(() => {
			result.current[0]();
			result.current[0]();
			result.current[0]();
			result.current[0]();
		});

		expect(mockedCb).toHaveBeenCalledTimes(limitCount);
	});

	it('should reset the invocations back to zero', () => {
		const mockedCb = vi.fn();

		const limitCount = 2;

		const { result } = renderHook(({ period, callback }) => useLimitCallback(callback, period), {
			initialProps: {
				period: limitCount,
				callback: mockedCb
			}
		});

		act(() => {
			result.current[0]();
			result.current[0]();

			result.current[1].reset();
		});

		result.current[0]();
		result.current[0]();
		result.current[0]();

		expect(mockedCb).toHaveBeenCalledTimes(limitCount * 2);
	});
});
