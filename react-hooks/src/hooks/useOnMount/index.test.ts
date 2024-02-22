import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOnMount } from '.';

describe('useOnMount() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useOnMount).toBeDefined();
	});

	it('runs the callback after mount', () => {
		const mockedCb = vi.fn();

		expect.hasAssertions();

		renderHook(({ cb }) => useOnMount(cb), {
			initialProps: {
				cb: mockedCb
			}
		});

		expect(mockedCb).toHaveBeenCalledOnce();
	});

	it('runs only once even on re-renders with same callback reference', () => {
		const mockedCb = vi.fn();
		expect.hasAssertions();
		const { rerender } = renderHook(({ cb }) => useOnMount(cb), {
			initialProps: {
				cb: mockedCb
			}
		});

		rerender({
			cb: mockedCb
		});

		expect(mockedCb).toHaveBeenCalledOnce();
	});

	it('runs only once even on re-renders with different callback reference', () => {
		const mockedCb1 = vi.fn();
		expect.hasAssertions();
		const { rerender } = renderHook(({ cb }) => useOnMount(cb), {
			initialProps: {
				cb: mockedCb1
			}
		});

		const mockedCb2 = vi.fn();
		rerender({
			cb: mockedCb2
		});

		expect(mockedCb1).toHaveBeenCalledOnce();
		expect(mockedCb2).not.toHaveBeenCalled();
	});
});
