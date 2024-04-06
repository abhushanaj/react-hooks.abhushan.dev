import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOnUpdate } from '.';

describe('useOnUpdate() hook', () => {
	it('should be defined', () => {
		expect(useOnUpdate).toBeDefined();
	});

	it('does not invoke on mount', () => {
		const mockedCb = vi.fn();

		renderHook(({ callback }) => useOnUpdate(callback), {
			initialProps: {
				callback: mockedCb
			}
		});

		expect(mockedCb).not.toHaveBeenCalled();
	});

	it('does not invoke on unmount', () => {
		const mockedCb = vi.fn();

		const { unmount } = renderHook(({ callback }) => useOnUpdate(callback), {
			initialProps: {
				callback: mockedCb
			}
		});

		unmount();

		expect(mockedCb).not.toHaveBeenCalled();
	});

	it('invokes on component update/re-render', () => {
		const mockedCb = vi.fn();

		const { rerender } = renderHook(({ callback }) => useOnUpdate(callback), {
			initialProps: {
				callback: mockedCb
			}
		});

		rerender({
			callback: mockedCb
		});

		expect(mockedCb).toHaveBeenCalledOnce();
	});

	it('invokes callback for every subsequent re-render', () => {
		const mockedCb = vi.fn();

		const { rerender } = renderHook(({ callback }) => useOnUpdate(callback), {
			initialProps: {
				callback: mockedCb
			}
		});

		rerender({
			callback: mockedCb
		});

		rerender({
			callback: mockedCb
		});

		rerender({
			callback: mockedCb
		});

		expect(mockedCb).toHaveBeenCalledTimes(3);
	});
});
