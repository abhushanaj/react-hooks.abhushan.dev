import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { RefObject } from 'react';

import { _useEventListener } from '.';

describe('_useEventListener() hook', () => {
	const mockedCb = vi.fn();

	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(_useEventListener).toBeDefined();
	});

	it('should remove the callback for the target', () => {
		expect.hasAssertions();
		const { unmount } = renderHook(() => _useEventListener(document, 'click', mockedCb));

		unmount();

		act(() => {
			document.dispatchEvent(new Event('click'));
		});

		expect(mockedCb).not.toHaveBeenCalled();
	});

	it('should setup event for document element', () => {
		expect.hasAssertions();

		renderHook(() => _useEventListener(document, 'click', mockedCb));

		act(() => {
			document.dispatchEvent(new Event('click'));
		});

		expect(mockedCb).toHaveBeenCalledTimes(1);
	});

	it('should setup event for window element', () => {
		expect.hasAssertions();

		renderHook(() => _useEventListener(window, 'click', mockedCb));

		act(() => {
			window.dispatchEvent(new Event('click'));
		});

		expect(mockedCb).toHaveBeenCalledTimes(1);
	});

	it('should setup event for a ref object', () => {
		expect.hasAssertions();

		const mockedRef = {
			current: document.createElement('button')
		} satisfies RefObject<HTMLButtonElement>;

		renderHook(() => _useEventListener(mockedRef, 'click', mockedCb));

		act(() => {
			mockedRef.current.dispatchEvent(new Event('click'));
		});

		expect(mockedCb).toHaveBeenCalledTimes(1);
	});

	it('should forward the passed event listener options', () => {
		expect.hasAssertions();

		const addEventListenerSpy = vi.spyOn(window, 'addEventListener').mockImplementation(() => {});

		const options: AddEventListenerOptions = {
			once: true,
			capture: false,
			passive: true
		};
		renderHook(() => _useEventListener(window, 'click', mockedCb, options));

		act(() => {
			window.dispatchEvent(new Event('click'));
		});

		expect(addEventListenerSpy).toHaveBeenLastCalledWith('click', mockedCb, options);
	});
});
