import React from 'react';
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

		expect(mockedCb).toHaveBeenCalledTimes(1);
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

		expect(mockedCb1).toHaveBeenCalledTimes(1);
		expect(mockedCb2).not.toHaveBeenCalled();
	});

	// Strict mode settings
	it('runs twice with strict mode enabled, even with same callback reference', () => {
		const mockedCb = vi.fn();

		expect.hasAssertions();
		const { rerender } = renderHook(({ cb }) => useOnMount(cb), {
			initialProps: {
				cb: mockedCb
			},
			wrapper: React.StrictMode
		});

		rerender({
			cb: mockedCb
		});

		expect(mockedCb).toHaveBeenCalledTimes(2);
	});

	it('runs twice with strict mode enabled, with different callback reference', () => {
		const mockedCb1 = vi.fn();
		expect.hasAssertions();
		const { rerender } = renderHook(({ cb }) => useOnMount(cb), {
			initialProps: {
				cb: mockedCb1
			},
			wrapper: React.StrictMode
		});

		const mockedCb2 = vi.fn();
		rerender({
			cb: mockedCb2
		});

		expect(mockedCb1).toHaveBeenCalledTimes(2);
		expect(mockedCb2).not.toHaveBeenCalled();
	});
});
