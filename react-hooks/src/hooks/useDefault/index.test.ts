import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useDefault } from '.';

describe('useDefault()', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useDefault).toBeDefined();
	});

	describe('throws when default value is null or undefined', () => {
		const errorMessage = /Default value cannot be undefined|null/;
		const input = 'InitialValue';

		it('when default value is undefined', () => {
			expect.hasAssertions();

			expect(() => {
				// @ts-expect-error - To test the case for undefined or null throwing error
				renderHook(({ initialValue, defaultValue }) => useDefault(initialValue, defaultValue), {
					initialProps: {
						initialValue: input,
						defaultValue: undefined
					}
				});
			}).toThrowError(errorMessage);
		});

		it('when default value is null', () => {
			expect.hasAssertions();

			expect(() => {
				// @ts-expect-error: disabling as we need to test this case when it is undefined or null
				renderHook(({ initialValue, defaultValue }) => useDefault(initialValue, defaultValue), {
					initialProps: {
						initialValue: input,
						defaultValue: null
					}
				});
			}).toThrowError(errorMessage);
		});
	});

	it('returns the initial value  correctly for non null or undefined values', () => {
		expect.hasAssertions();
		const input = 'Initial';

		const { result } = renderHook(({ initialValue, defaultValue }) => useDefault(initialValue, defaultValue), {
			initialProps: {
				initialValue: input,
				defaultValue: 'Default'
			}
		});

		expect(result.current[0]).toBe(input);
	});

	it('returns default value when initial value is null or undefined', () => {
		expect.hasAssertions();
		const defaultFallback = 'Default';

		const { result } = renderHook(({ initialValue, defaultValue }) => useDefault(initialValue, defaultValue), {
			initialProps: {
				initialValue: undefined,
				defaultValue: defaultFallback
			}
		});

		expect(result.current[0]).toBe(defaultFallback);
	});

	it('returns default value when value is set to null or undefined using the updater function', () => {
		expect.hasAssertions();
		let input: string | null | undefined = 'Input';
		const defaultFallback = 'Default';

		const { result } = renderHook(({ initialValue, defaultValue }) => useDefault(initialValue, defaultValue), {
			initialProps: {
				initialValue: input,
				defaultValue: defaultFallback
			}
		});

		// When input is set to undefined
		input = undefined;
		act(() => {
			result.current[1](input);
		});
		expect(result.current[0]).toBe(defaultFallback);

		// When state is set to null
		input = null;
		act(() => {
			result.current[1](input);
		});
		expect(result.current[0]).toBe(defaultFallback);
	});
});
