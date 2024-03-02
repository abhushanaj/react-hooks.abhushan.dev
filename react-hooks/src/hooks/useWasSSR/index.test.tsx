import { render } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { renderToStaticMarkup } from 'react-dom/server';
import { beforeEach, describe, expect, it } from 'vitest';

import type { FC } from 'react';

import { useWasSSR } from '.';

/**
 * Unsure if these are the right way to test them.
 */
describe('useWasSSR() hook', () => {
	let result: boolean | undefined;
	let TestComponent: FC;

	beforeEach(() => {
		result = undefined;
		TestComponent = function Comp() {
			result = useWasSSR();
			return null;
		};
	});

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useWasSSR).toBeDefined();
	});

	it('returns false when the component was not SSR', () => {
		render(<TestComponent />);
		expect(result).toBe(false);
	});

	it('returns true when the component was SSR', () => {
		renderToStaticMarkup(<TestComponent />);
		expect(result).toBe(true);
	});
});
