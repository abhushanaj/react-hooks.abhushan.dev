import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSubscribeToCustomEvent } from '.';

describe('useSubscribeToCustomEvent', () => {
	const customEvtName = 'customEvent';
	const customEvtPayload = {
		data: {
			msg: 'Hi'
		}
	};

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useSubscribeToCustomEvent).toBeDefined();
	});

	describe('should return the unsubscribe function', () => {
		it('should be a function', () => {
			expect.hasAssertions();
			const { result } = renderHook(() => useSubscribeToCustomEvent(customEvtName, () => {}));
			expect(result.current).toBeTypeOf('function');
		});

		it('should unsubscribe from the event after calling unsubscribe', () => {
			expect.hasAssertions();

			const mockCb = vi.fn();

			const { result } = renderHook(() => useSubscribeToCustomEvent(customEvtName, mockCb));

			act(() => {
				result.current();
			});

			act(() => {
				window.dispatchEvent(new CustomEvent(customEvtName));
			});

			expect(mockCb).not.toBeCalled();
		});
	});

	describe('should invoke the callback for event fire', () => {
		it('with no payload', () => {
			expect.hasAssertions();

			const mockCb = vi.fn();

			renderHook(({ eventName, callback }) => useSubscribeToCustomEvent(eventName, callback), {
				initialProps: {
					eventName: customEvtName,
					callback: mockCb
				}
			});

			act(() => {
				window.dispatchEvent(new CustomEvent(customEvtName));
			});

			expect(mockCb).toBeCalledTimes(1);
		});

		it('with some payload', () => {
			expect.hasAssertions();

			let incomingPayload: unknown = undefined;

			const mockCb = vi.fn().mockImplementation((e: CustomEvent<typeof customEvtPayload>) => {
				incomingPayload = e.detail;
			});

			renderHook(({ eventName, callback }) => useSubscribeToCustomEvent<typeof customEvtPayload>(eventName, callback), {
				initialProps: {
					eventName: customEvtName,
					callback: mockCb
				}
			});

			act(() => {
				window.dispatchEvent(
					new CustomEvent(customEvtName, {
						detail: customEvtPayload
					})
				);
			});

			expect(mockCb).toBeCalledTimes(1);
			expect(incomingPayload).toEqual(customEvtPayload);
		});
	});
});
