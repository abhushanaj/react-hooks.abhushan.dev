import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOnUnmount } from '.';

describe('useOnUnmount() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useOnUnmount).toBeDefined();
	});

	it('runs the callback after unmount', () => {
		const mockedCb = vi.fn();

		expect.hasAssertions();

		const { unmount } = renderHook(({ cb }) => useOnUnmount(cb), {
			initialProps: {
				cb: mockedCb
			}
		});

		unmount();

		expect(mockedCb).toHaveBeenCalledOnce();
	});

	it('runs only on unmount, even on re-renders with same callback reference', () => {
		const mockedCb = vi.fn();
		expect.hasAssertions();
		const { rerender, unmount } = renderHook(({ cb }) => useOnUnmount(cb), {
			initialProps: {
				cb: mockedCb
			}
		});

		rerender({
			cb: mockedCb
		});

		expect(mockedCb).not.toHaveBeenCalledOnce();

		unmount();
		expect(mockedCb).toHaveBeenCalledOnce();
	});

	it('runs only unmount for first reference calback,  on re-renders with different callback reference', () => {
		const mockedCb1 = vi.fn();
		expect.hasAssertions();
		const { rerender, unmount } = renderHook(({ cb }) => useOnUnmount(cb), {
			initialProps: {
				cb: mockedCb1
			}
		});

		const mockedCb2 = vi.fn();
		rerender({
			cb: mockedCb2
		});

		expect(mockedCb1).not.toHaveBeenCalled();
		expect(mockedCb2).not.toHaveBeenCalled();

		unmount();
		expect(mockedCb1).toHaveBeenCalledOnce();
		expect(mockedCb2).not.toHaveBeenCalled();
	});
});
