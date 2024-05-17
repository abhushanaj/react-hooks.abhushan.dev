import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useDispatchCustomEvent } from '.';

describe('useDispatchCustomEvent', () => {
	const customEventName = 'customName';

	let listenerPayload: unknown = undefined;

	let listenerCb = vi.fn().mockImplementation((e: CustomEvent) => {
		listenerPayload = e.detail;
	});

	function setup() {
		listenerCb = vi.fn().mockImplementation((e: CustomEvent) => {
			listenerPayload = e.detail;
		});

		window.addEventListener(customEventName, listenerCb);
	}

	function tearDown() {
		window.removeEventListener(customEventName, listenerCb);
		listenerPayload = undefined;
		vi.resetAllMocks();
	}

	beforeEach(setup);

	afterEach(tearDown);

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useDispatchCustomEvent).toBeDefined();
	});

	it('should return the dispatch function', () => {
		expect.hasAssertions();
		const { result } = renderHook(() => useDispatchCustomEvent(customEventName));
		expect(result.current).toBeTypeOf('function');
	});

	it('should dispatch event the correct number of times', () => {
		expect.hasAssertions();
		const { result } = renderHook(() => useDispatchCustomEvent(customEventName));

		act(() => {
			result.current();
			result.current();
		});

		expect(listenerCb).toHaveBeenCalledTimes(2);
	});

	describe('should dispatch the custom event with right payload', () => {
		it('with no payload', () => {
			expect.hasAssertions();

			const { result } = renderHook(() => useDispatchCustomEvent(customEventName));

			act(() => {
				result.current();
			});

			expect(listenerCb).toHaveBeenCalledTimes(1);
			expect(listenerPayload).toBeNull();
		});

		it('with custom payload', () => {
			expect.hasAssertions();

			const { result } = renderHook(() => useDispatchCustomEvent(customEventName));

			const customPayload = {
				data: {
					message: 'Hello World'
				}
			};

			act(() => {
				result.current(customPayload);
			});

			expect(listenerCb).toHaveBeenCalledTimes(1);
			expect(listenerPayload).toEqual(customPayload);
		});
	});
});
