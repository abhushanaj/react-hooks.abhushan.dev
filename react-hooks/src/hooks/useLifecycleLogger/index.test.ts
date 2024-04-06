import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useLifecycleLogger } from '.';

describe('useLifecycleLogger() hook', () => {
	let loggerSpy = vi.spyOn(console, 'log');
	const componentName = 'Test';

	afterEach(() => {
		loggerSpy.mockRestore();
	});

	beforeEach(() => {
		loggerSpy = vi.spyOn(console, 'log');
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useLifecycleLogger).toBeDefined();
	});

	it('should log when component mount', () => {
		expect.hasAssertions();
		renderHook(({ name }) => useLifecycleLogger(name), {
			initialProps: {
				name: componentName
			}
		});

		expect(loggerSpy).toHaveBeenCalledOnce();
	});

	it('should log when component unmouts', () => {
		expect.hasAssertions();
		const { unmount } = renderHook(({ name }) => useLifecycleLogger(name), {
			initialProps: {
				name: componentName
			}
		});

		unmount();
		expect(loggerSpy).toHaveBeenCalledTimes(2);
	});

	it('should log when component updates', () => {
		expect.hasAssertions();
		const { rerender } = renderHook(({ name }) => useLifecycleLogger(name), {
			initialProps: {
				name: componentName
			}
		});

		rerender({
			name: componentName
		});

		rerender({
			name: componentName
		});

		expect(loggerSpy).toHaveBeenCalledTimes(3);
	});
});
