import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDebouncedValue } from '.';

describe('useDebouncedValue() hook', () => {
	const inputValue = 'Test Value';
	const inputWaitTime = 100;

	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useDebouncedValue).toBeDefined();
	});

	it('should return undefined on initial render value', () => {
		const { result } = renderHook(({ value, wait }) => useDebouncedValue(value, wait), {
			initialProps: {
				value: inputValue,
				wait: inputWaitTime
			}
		});

		expect(result.current[0]).toBeUndefined();
	});

	it('should cancel any pending invocations when cancel is invoked', () => {
		const { result } = renderHook(({ value, wait }) => useDebouncedValue(value, wait), {
			initialProps: {
				value: inputValue,
				wait: inputWaitTime
			}
		});

		// cancel here
		act(() => {
			result.current[1]();
		});

		// even after advancing the timer the value should still be the og value
		act(() => {
			vi.advanceTimersByTime(inputWaitTime);
		});

		expect(result.current[0]).toBeUndefined();
	});

	it('should not update value if unmounts before wait(ms)', () => {
		const { result, unmount } = renderHook(({ value, wait }) => useDebouncedValue(value, wait), {
			initialProps: {
				value: inputValue,
				wait: inputWaitTime
			}
		});

		unmount();

		// even after advancing the timer the value should still be the og value
		act(() => {
			vi.advanceTimersByTime(inputWaitTime);
		});

		expect(result.current[0]).toBeUndefined();
	});

	it('should return value when wait (ms) is over', () => {
		const { result } = renderHook(({ value, wait }) => useDebouncedValue(value, wait), {
			initialProps: {
				value: inputValue,
				wait: inputWaitTime
			}
		});

		act(() => {
			vi.advanceTimersByTime(inputWaitTime);
		});

		expect(result.current[0]).toBe(inputValue);
	});

	it('should return newer values on future renders when value changes', () => {
		const { result, rerender } = renderHook(({ value, wait }) => useDebouncedValue(value, wait), {
			initialProps: {
				value: inputValue,
				wait: inputWaitTime
			}
		});

		const updatedValue = 'New Value';

		rerender({
			value: updatedValue,
			wait: inputWaitTime
		});

		// should still be undefined
		expect(result.current[0]).toBeUndefined();

		// we advance the timer by wait (ms)
		act(() => {
			vi.advanceTimersByTime(inputWaitTime);
		});

		// now should reflect the new value
		expect(result.current[0]).toBe(updatedValue);
	});

	it('should use the new wait (ms) values on future renders', () => {
		const { result, rerender } = renderHook(({ value, wait }) => useDebouncedValue(value, wait), {
			initialProps: {
				value: inputValue,
				wait: inputWaitTime
			}
		});

		const updatedWaitTime = 200;

		rerender({
			value: inputValue,
			wait: updatedWaitTime
		});

		// should still be undefined
		expect(result.current[0]).toBeUndefined();

		// we advance the timer by old wait (ms)
		act(() => {
			vi.advanceTimersByTime(inputWaitTime);
		});

		// now shuld not reflect the old value
		expect(result.current[0]).toBeUndefined();

		// we advance the timer by new wait (ms)
		act(() => {
			vi.advanceTimersByTime(updatedWaitTime);
		});

		expect(result.current[0]).toBe(inputValue);
	});
});
