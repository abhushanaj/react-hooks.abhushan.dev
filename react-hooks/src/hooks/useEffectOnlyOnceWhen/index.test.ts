import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useEffectOnlyOnceWhen } from '.';

describe('useEffectOnlyOnceWhen() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useEffectOnlyOnceWhen).toBeDefined();
	});

	it('should run callback when condition is true', () => {
		expect.hasAssertions();
		const mockedCb = vi.fn();

		renderHook(({ callback, condition }) => useEffectOnlyOnceWhen(callback, condition), {
			initialProps: {
				callback: mockedCb,
				condition: true
			}
		});

		expect(mockedCb).toHaveBeenCalled();
	});

	it('should run callback when condition becomes true in future renders', () => {
		expect.hasAssertions();
		const mockedCb = vi.fn();

		const { rerender } = renderHook(({ callback, condition }) => useEffectOnlyOnceWhen(callback, condition), {
			initialProps: {
				callback: mockedCb,
				condition: false
			}
		});

		expect(mockedCb).not.toHaveBeenCalled();

		rerender({
			callback: mockedCb,
			condition: true
		});

		expect(mockedCb).toHaveBeenCalled();
	});

	it('should run only once, when the condition is met even for future re-renders', () => {
		expect.hasAssertions();

		const mockedCb = vi.fn();

		const { rerender } = renderHook(({ callback, condition }) => useEffectOnlyOnceWhen(callback, condition), {
			initialProps: {
				callback: mockedCb,
				condition: true
			}
		});

		rerender({
			callback: mockedCb,
			condition: true
		});

		expect(mockedCb).toHaveBeenCalledTimes(1);
	});
});
