import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useWindowSize } from '.';

describe('useWindowSize() hook', () => {
	const windowWidthSpy = vi.spyOn(window, 'innerWidth', 'get');
	const windowHeightSpy = vi.spyOn(window, 'innerHeight', 'get');

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useWindowSize).toBeDefined();
	});

	it('should return the correction dimesions of the window on render', () => {
		expect.hasAssertions();

		const defaultWindowWidth = 5_00;
		const defaultWindowHeight = 7_00;

		windowWidthSpy.mockReturnValue(defaultWindowWidth);
		windowHeightSpy.mockReturnValue(defaultWindowHeight);

		const { result } = renderHook(() => useWindowSize());

		expect(result.current.width).toBe(defaultWindowWidth);
		expect(result.current.height).toBe(defaultWindowHeight);
	});

	it('should update dimensions based on the resize event', () => {
		expect.hasAssertions();

		const { result } = renderHook(() => useWindowSize());

		const updatedWidth = 1000;
		const updatedHeight = 500;

		// mock the resize event action
		act(() => {
			windowWidthSpy.mockReturnValue(updatedWidth);
			windowHeightSpy.mockReturnValue(updatedHeight);
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.width).toBe(updatedWidth);
		expect(result.current.height).toBe(updatedHeight);
	});

	it('should not return latest dimensions after component unmount', () => {
		expect.hasAssertions();

		const initialWidth = 1_00;
		const initialHeight = 3_00;

		windowWidthSpy.mockReturnValue(initialWidth);
		windowHeightSpy.mockReturnValue(initialHeight);

		const { result, unmount } = renderHook(() => useWindowSize());

		// we unmount here, to the values of resize event shuld not reflect anymore
		unmount();

		act(() => {
			// random values updated by resize
			windowWidthSpy.mockReturnValue(500);
			windowHeightSpy.mockReturnValue(600);
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.width).toBe(initialWidth);
		expect(result.current.height).toBe(initialHeight);
	});
});
