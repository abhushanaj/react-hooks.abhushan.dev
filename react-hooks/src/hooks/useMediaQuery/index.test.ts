import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useMediaQuery } from '.';

describe('useMediaQuery() hook', () => {
	const query = '(max-width: 600px)';

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useMediaQuery).toBeDefined();
	});

	it('should return true when query matches', () => {
		expect.hasAssertions();

		const mockedMatchedMedia = vi.spyOn(window, 'matchMedia');

		mockedMatchedMedia.mockReturnValue({
			matches: true,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn()
		} as unknown as MediaQueryList);

		const { result } = renderHook(({ mediaQueryString }) => useMediaQuery(mediaQueryString), {
			initialProps: {
				mediaQueryString: query
			}
		});

		expect(result.current).toBe(true);
	});

	it('should return false when query does not match', () => {
		expect.hasAssertions();

		const mockedMatchedMedia = vi.spyOn(window, 'matchMedia');

		mockedMatchedMedia.mockReturnValue({
			matches: false,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn()
		} as unknown as MediaQueryList);

		const { result } = renderHook(({ mediaQueryString }) => useMediaQuery(mediaQueryString), {
			initialProps: {
				mediaQueryString: query
			}
		});

		expect(result.current).toBe(false);
	});

	it('should subscribe and unsubscribe to the change event on the mediaListQuery', () => {
		const mockedMatchedMedia = vi.spyOn(window, 'matchMedia');

		const addEventListenerMock = vi.fn();
		const removeEventListenerMock = vi.fn();

		mockedMatchedMedia.mockReturnValue({
			matches: false,
			addEventListener: addEventListenerMock,
			removeEventListener: removeEventListenerMock
		} as unknown as MediaQueryList);

		const { unmount } = renderHook(({ mediaQueryString }) => useMediaQuery(mediaQueryString), {
			initialProps: {
				mediaQueryString: query
			}
		});

		expect(addEventListenerMock).toBeCalled();

		unmount();
		expect(removeEventListenerMock).toBeCalled();
	});
});
