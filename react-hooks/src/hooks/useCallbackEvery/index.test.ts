import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useCallbackEvery } from '.';

describe('useCallbackEvery() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useCallbackEvery).toBeDefined();
	});

	it('should invoke callback after every n period', () => {
		const callbackMock = vi.fn();

		const { result } = renderHook(({ callback, period }) => useCallbackEvery(callback, period), {
			initialProps: {
				callback: callbackMock,
				period: 2
			}
		});

		act(() => {
			result.current[0]();
			result.current[0]();
			result.current[0]();
		});

		expect(callbackMock).toBeCalledTimes(1);
	});

	it('should reset the invocation back to initial state', () => {
		const callbackMock = vi.fn();

		const { result } = renderHook(({ callback, period }) => useCallbackEvery(callback, period), {
			initialProps: {
				callback: callbackMock,
				period: 2
			}
		});

		act(() => {
			result.current[0]();
			result.current[1].reset();
		});

		expect(callbackMock).not.toHaveBeenCalled();

		act(() => {
			result.current[0]();
			result.current[0]();
		});

		expect(callbackMock).toHaveBeenCalledTimes(1);
	});
});
