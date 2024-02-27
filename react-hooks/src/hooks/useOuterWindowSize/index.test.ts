import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOuterWindowSize } from '.';

describe('useOuterWindowSize() hook', () => {
	const outerWidthSpy = vi.spyOn(window, 'outerWidth', 'get');
	const outerHeightSpy = vi.spyOn(window, 'outerHeight', 'get');

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useOuterWindowSize).toBeDefined();
	});

	it('should return the outerWidth and outerHeight values', () => {
		expect.hasAssertions();
		const defaultOuterWidth = 1_000;
		const defaultOuterHeight = 5_00;

		outerWidthSpy.mockReturnValue(defaultOuterWidth);
		outerHeightSpy.mockReturnValue(defaultOuterHeight);

		const { result } = renderHook(() => useOuterWindowSize());

		expect(result.current.width).toBe(defaultOuterWidth);
		expect(result.current.height).toBe(defaultOuterHeight);
	});

	it('should update the outerWidth and outerHeight values on resize event', () => {
		expect.hasAssertions();

		const { result } = renderHook(() => useOuterWindowSize());

		const updatedOuterWidth = 1_00;
		const updatedOuterHeight = 2_00;

		act(() => {
			outerWidthSpy.mockReturnValue(updatedOuterWidth);
			outerHeightSpy.mockReturnValue(updatedOuterHeight);
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.width).toBe(updatedOuterWidth);
		expect(result.current.height).toBe(updatedOuterHeight);
	});

	it('should not give updated dimension after unmount', () => {
		expect.hasAssertions();

		const initialOuterWidth = 1_00;
		const initialOuterHeight = 3_00;

		outerWidthSpy.mockReturnValue(initialOuterWidth);
		outerHeightSpy.mockReturnValue(initialOuterHeight);

		const { result, unmount } = renderHook(() => useOuterWindowSize());

		// we unmount here, to the values of resize event should not reflect anymore.
		unmount();

		act(() => {
			// random values updated by resize
			outerWidthSpy.mockReturnValue(500);
			outerHeightSpy.mockReturnValue(600);
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.width).toBe(initialOuterWidth);
		expect(result.current.height).toBe(initialOuterHeight);
	});
});
