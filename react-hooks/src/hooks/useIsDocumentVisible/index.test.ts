import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useIsDocumentVisible } from '.';

describe('useIsDocumentVisible() hook', () => {
	const visibilitySpy = vi.spyOn(document, 'visibilityState', 'get');

	it('should be defined', () => {
		expect.hasAssertions();

		expect(useIsDocumentVisible).toBeDefined();
	});

	it('returns true when the visibility state is not hidden', () => {
		expect.hasAssertions();

		visibilitySpy.mockReturnValue('visible');

		const { result } = renderHook(() => useIsDocumentVisible());

		expect(result.current).toBe(true);
	});

	it('returns false when the visibility state is hidden', () => {
		expect.hasAssertions();

		visibilitySpy.mockReturnValue('hidden');

		const { result } = renderHook(() => useIsDocumentVisible());

		expect(result.current).toBe(false);
	});
});
