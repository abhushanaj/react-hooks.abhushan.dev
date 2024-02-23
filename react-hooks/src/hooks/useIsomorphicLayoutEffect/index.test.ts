import React from 'react';
import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Mock } from 'vitest';

import * as utils from '../../utils';

vi.mock('react');
vi.mock('../../utils');

describe('useIsomorphicLayoutEffect() hook', () => {
	afterEach(() => {
		vi.resetAllMocks();
		/**
		 * We do this  as we are dynamically importing the hook, we want to clear the module cache.
		 * This is done so tye mocked of utils.isWindow is again reevlauted on the module of useIsomorphicLayoutEffect.
		 * Without this the module will be cached and the mocked value won't matter since modules took the first mocked value and returned the hook.
		 * */
		vi.resetModules();
	});

	it('should be reference of useLayoutEffect for window based environment', async () => {
		expect.hasAssertions();

		(utils.isWindow as Mock).mockReturnValue(true);

		const { useIsomorphicLayoutEffect } = await import('.');

		renderHook(() => useIsomorphicLayoutEffect(() => {}, []));

		expect(React.useEffect).not.toHaveBeenCalled();
		expect(React.useLayoutEffect).toHaveBeenCalled();
	});

	it('should be reference of useEffect for non-window based environment', async () => {
		expect.hasAssertions();

		(utils.isWindow as Mock).mockReturnValue(false);

		const { useIsomorphicLayoutEffect } = await import('.');

		renderHook(() => useIsomorphicLayoutEffect(() => {}, []));

		expect(React.useEffect).toHaveBeenCalled();
		expect(React.useLayoutEffect).not.toHaveBeenCalled();
	});
});
