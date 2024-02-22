import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOnUnmount } from '.';

describe('useOnUnmount() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useOnUnmount).toBeDefined();
	});

	it('runs the callback on unmount', () => {
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

	it('runs only unmount for first reference calback, even on re-renders with different callback reference', () => {
		const mockedCb1 = vi.fn();
		expect.hasAssertions();
		const { rerender, unmount } = renderHook(({ cb }) => useOnUnmount(cb), {
			initialProps: {
				cb: mockedCb1
			}
		});

		expect(mockedCb1).not.toHaveBeenCalled();

		const mockedCb2 = vi.fn();
		rerender({
			cb: mockedCb2
		});
		expect(mockedCb2).not.toHaveBeenCalled();

		unmount();
		expect(mockedCb1).toHaveBeenCalledTimes(1);
		expect(mockedCb2).not.toHaveBeenCalled();
	});

	// With Strict Mode Enabled
	describe('when strict mode is enabled', () => {
		it('runs twice on unmount', () => {
			const mockedCb = vi.fn();
			expect.hasAssertions();
			const { unmount } = renderHook(({ cb }) => useOnUnmount(cb), {
				initialProps: {
					cb: mockedCb
				},
				wrapper: React.StrictMode
			});

			unmount();
			expect(mockedCb).toHaveBeenCalledTimes(2);
		});

		it('runs only on unmount, even on re-renders with same callback reference', () => {
			const mockedCb = vi.fn();
			expect.hasAssertions();
			const { rerender, unmount } = renderHook(({ cb }) => useOnUnmount(cb), {
				initialProps: {
					cb: mockedCb
				},
				wrapper: React.StrictMode
			});

			rerender({
				cb: mockedCb
			});

			unmount();
			expect(mockedCb).toHaveBeenCalledTimes(2);
		});

		it('runs only unmount for first reference calback,  even on re-renders with different callback reference', () => {
			const mockedCb1 = vi.fn();
			expect.hasAssertions();
			const { rerender, unmount } = renderHook(({ cb }) => useOnUnmount(cb), {
				initialProps: {
					cb: mockedCb1
				},
				wrapper: React.StrictMode
			});

			// due to double mounts
			expect(mockedCb1).toHaveBeenCalledTimes(1);

			const mockedCb2 = vi.fn();
			rerender({
				cb: mockedCb2
			});
			expect(mockedCb2).not.toHaveBeenCalled();

			unmount();
			// due to double mounts + manual unmount
			expect(mockedCb1).toHaveBeenCalledTimes(2);
			expect(mockedCb2).not.toHaveBeenCalled();
		});
	});
});
