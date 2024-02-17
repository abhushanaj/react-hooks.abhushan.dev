import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useToggle } from '.';

describe('useToggle() hook', () => {
	it('should be defined', () => {
		expect(useToggle).toBeDefined();
	});

	describe('correctly establishes the initial value, casting to boolean if not one', () => {
		it('returns false for falsy values', () => {
			const falsyValues = [0, -0, '', NaN, undefined, null, false];

			expect.assertions(falsyValues.length);

			falsyValues.forEach((val) => {
				const { result } = renderHook(({ value }) => useToggle(value), {
					initialProps: {
						value: val
					}
				});

				expect(result.current[0]).toBe(false);
			});
		});

		it('returns true for truthy values', () => {
			const truthyValues = [1, -1, '  ', () => {}, true];

			expect.assertions(truthyValues.length);

			truthyValues.forEach((val) => {
				const { result } = renderHook(({ value }) => useToggle(value), {
					initialProps: {
						value: val
					}
				});

				expect(result.current[0]).toBe(true);
			});
		});
	});

	it('returns the state as typeof boolean value', () => {
		const randomInputs = [1, 0, NaN, () => {}, true];
		expect.assertions(randomInputs.length);

		randomInputs.forEach((val) => {
			const { result } = renderHook(({ value }) => useToggle(value), {
				initialProps: {
					value: val
				}
			});

			expect(result.current[0]).toBeTypeOf('boolean');
		});
	});

	it('toggles the state when updater is called with a non boolean value', () => {
		let input: unknown = {};
		let castedInput = Boolean(input);

		expect.hasAssertions();
		const { result } = renderHook(({ value }) => useToggle(value), {
			initialProps: {
				value: input
			}
		});

		act(() => {
			result.current[1](input);
		});

		expect(result.current[0]).toBe(!castedInput);

		input = null;
		castedInput = Boolean(input);

		act(() => {
			result.current[1](input);
		});

		expect(result.current[0]).toBe(!castedInput);
	});

	it('sets the state directly when updater is called with a  boolean value', () => {
		let input: boolean = true;

		expect.hasAssertions();

		const { result } = renderHook(({ value }) => useToggle(value), {
			initialProps: {
				value: input
			}
		});

		expect(result.current[0]).toBe(input);

		input = false;
		act(() => {
			result.current[1](input);
		});

		expect(result.current[0]).toBe(input);
	});
});
