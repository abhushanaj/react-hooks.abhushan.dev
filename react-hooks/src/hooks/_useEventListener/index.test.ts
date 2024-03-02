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

	it('should setup and destroy listeners for any generic target element', () => {
		const mockedAddEvtListener = vi.fn();

		const mockedRemoveEvtListener = vi.fn();

		const element = {
			addEventListener: mockedAddEvtListener,
			removeEventListener: mockedRemoveEvtListener,
			dispatchEvent: vi.fn()
		} as unknown as Element;

		const options = {};

		expect.hasAssertions();

		const { unmount } = renderHook(() => _useEventListener(element, 'click', mockedCb, options));

		act(() => {
			element.dispatchEvent(new Event('click'));
		});

		expect(mockedAddEvtListener).toHaveBeenCalledWith('click', mockedCb, options);
		expect(mockedRemoveEvtListener).not.toHaveBeenCalled();

		unmount();
		expect(mockedRemoveEvtListener).toHaveBeenCalledWith('click', mockedCb, options);
	});

	it('should setup event for a generic ref object', () => {
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
