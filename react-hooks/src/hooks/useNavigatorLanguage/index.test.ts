import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useNavigatorLanguage } from '.';

describe('useNavigatorLanguage() hook', () => {
	const navigatorLangSpy = vi.spyOn(window.navigator, 'language', 'get');

	it('is defined', () => {
		expect.hasAssertions();
		expect(useNavigatorLanguage).toBeDefined();
	});

	it('returns the navigator language', () => {
		expect.hasAssertions();
		const lang = 'en-US';

		navigatorLangSpy.mockReturnValue(lang);

		const { result } = renderHook(() => useNavigatorLanguage());
		expect(result.current).toBe(lang);
	});
});
