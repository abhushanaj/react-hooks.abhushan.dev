import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useOnline } from '.';

describe('useOnline() hook', () => {
	const navigatorOnlineStatusSpy = vi.spyOn(window.navigator, 'onLine', 'get');

	it('should be defined', () => {
		expect(useOnline).toBeDefined();
	});

	it('should get the correct offline status', () => {
		expect.hasAssertions();

		navigatorOnlineStatusSpy.mockReturnValue(false);

		const { result } = renderHook(() => useOnline());
		expect(result.current).toBe(false);
	});

	it('should get the correct online status', () => {
		expect.hasAssertions();

		navigatorOnlineStatusSpy.mockReturnValue(true);

		const { result } = renderHook(() => useOnline());
		expect(result.current).toBe(true);
	});
});
