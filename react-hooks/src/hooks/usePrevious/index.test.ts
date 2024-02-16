import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePrevious } from '.';

describe('usePrevious() hook', () => {
	it('should be defined', () => {
		expect(usePrevious).toBeDefined();
	});

	describe('with default value >', () => {
		it('returns undefined on first render with no default value', () => {
			expect.hasAssertions();
			// initial render
			const { result } = renderHook(({ value }) => usePrevious(value), {
				initialProps: {
					value: 1
				}
			});

			expect(result.current).toBeUndefined();
		});

		it('returns correct default value on first render when passed', () => {
			expect.hasAssertions();

			const defaultVal = 0;

			// initial render
			const { result } = renderHook(({ value, defaultValue }) => usePrevious(value, defaultValue), {
				initialProps: {
					value: 1,
					defaultValue: defaultVal
				}
			});

			expect(result.current).toBe(defaultVal);
		});
	});

	it('should return the previous value on future renders', () => {
		let initialCount = 1;

		expect.hasAssertions();

		// initial render
		const { rerender, result } = renderHook(({ value }) => usePrevious(value), {
			initialProps: {
				value: initialCount
			}
		});

		// future render one
		++initialCount;
		rerender({
			value: initialCount
		});

		expect(result.current).toBe(initialCount - 1);

		// future render two
		++initialCount;
		rerender({
			value: initialCount
		});
		expect(result.current).toBe(initialCount - 1);
	});
});
