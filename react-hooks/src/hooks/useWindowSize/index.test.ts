import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useWindowSize } from '.';

describe('useWindowSize() hook', () => {
	const windowWidthSpy = vi.spyOn(window, 'innerWidth', 'get');
	const windowHeightSpy = vi.spyOn(window, 'innerHeight', 'get');

	const defaultWindowWidth = 5_00;
	const defaultWindowHeight = 7_00;

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useWindowSize).toBeDefined();
	});

	it('should return the correction dimesions of the window on render', () => {
		expect.hasAssertions();

		windowWidthSpy.mockReturnValue(defaultWindowWidth);
		windowHeightSpy.mockReturnValue(defaultWindowHeight);

		const { result } = renderHook(() => useWindowSize());

		expect(result.current.width).toBe(defaultWindowWidth);
		expect(result.current.height).toBe(defaultWindowHeight);
	});

	it('should update dimensions based on the resize event', () => {
		expect.hasAssertions();

		windowWidthSpy.mockReturnValue(defaultWindowWidth);
		windowHeightSpy.mockReturnValue(defaultWindowHeight);

		const { result } = renderHook(() => useWindowSize());

		const updatedWidth = 100;
		const updatedHeight = 200;

		// mcok the resize event action
		act(() => {
			windowWidthSpy.mockReturnValue(updatedWidth);
			windowHeightSpy.mockReturnValue(updatedHeight);
			window.dispatchEvent(new Event('resize'));
		});

		expect(result.current.width).toBe(updatedWidth);
		expect(result.current.height).toBe(updatedHeight);
	});
});
