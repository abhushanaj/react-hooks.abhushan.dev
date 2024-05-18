import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useCustomEvent } from '.';

describe('useCustomEvent() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useCustomEvent).toBeDefined();
	});

	/**
	 * Since the hook is composed of two other hooks, we simply check for integrity here.
	 */
	it('should dispatch, subscribe and unsubscribe', () => {
		expect.hasAssertions();

		const cb = vi.fn();
		const customEventName = 'customEvt';

		const { result } = renderHook(({ callback, eventName }) => useCustomEvent(eventName, callback), {
			initialProps: {
				eventName: customEventName,
				callback: cb
			}
		});

		act(() => {
			result.current[0]();
		});

		expect(cb).toHaveBeenCalledTimes(1);

		act(() => {
			result.current[1]();
			result.current[0]();
		});

		expect(cb).toHaveBeenCalledTimes(1);
	});
});
