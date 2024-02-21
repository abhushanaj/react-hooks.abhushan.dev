import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useCounter } from '.';

describe('useCounter() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useCounter).toBeDefined();
	});

	it('returns the initial count on first render', () => {
		const count = 0;
		expect.hasAssertions();

		const { result } = renderHook(({ initialCount }) => useCounter(initialCount), {
			initialProps: {
				initialCount: count
			}
		});

		expect(result.current[0]).toBe(count);
	});

	describe('returns the right count value with default options', () => {
		let count = 0;
		beforeEach(() => {
			count = 0;
		});

		it('increment by 1', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialCount }) => useCounter(initialCount), {
				initialProps: {
					initialCount: count
				}
			});

			act(() => {
				result.current[1].increment();
			});
			expect(result.current[0]).toBe(count + 1);
		});

		it('decrement by 1', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialCount }) => useCounter(initialCount), {
				initialProps: {
					initialCount: count
				}
			});

			act(() => {
				result.current[1].decrement();
			});
			expect(result.current[0]).toBe(count - 1);
		});

		it('set to x', () => {
			expect.hasAssertions();
			count = 5;

			const { result } = renderHook(({ initialCount }) => useCounter(initialCount), {
				initialProps: {
					initialCount: count
				}
			});

			act(() => {
				result.current[1].set(count);
			});
			expect(result.current[0]).toBe(count);
		});

		it('reset to initial count', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialCount }) => useCounter(initialCount), {
				initialProps: {
					initialCount: count
				}
			});

			act(() => {
				result.current[1].reset();
			});
			expect(result.current[0]).toBe(count);
		});
	});

	describe('returns the right count value with custom step option set', () => {
		let initial = 5;
		const stepCount = 5;

		beforeEach(() => {
			initial = 5;
		});

		it('increment by step', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialCount, step }) => useCounter(initialCount, { step }), {
				initialProps: {
					initialCount: initial,
					step: stepCount
				}
			});

			act(() => {
				result.current[1].increment();
			});
			expect(result.current[0]).toBe(initial + stepCount);
		});

		it('decrement by step', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialCount, step }) => useCounter(initialCount, { step }), {
				initialProps: {
					initialCount: initial,
					step: stepCount
				}
			});

			act(() => {
				result.current[1].decrement();
			});
			expect(result.current[0]).toBe(initial - stepCount);
		});

		it('set to x', () => {
			expect.hasAssertions();
			initial = 5;

			const { result } = renderHook(({ initialCount }) => useCounter(initialCount), {
				initialProps: {
					initialCount: initial
				}
			});

			act(() => {
				result.current[1].set(initial);
			});
			expect(result.current[0]).toBe(initial);
		});

		it('reset to initial count', () => {
			expect.hasAssertions();
			const { result } = renderHook(({ initialCount }) => useCounter(initialCount), {
				initialProps: {
					initialCount: initial
				}
			});

			act(() => {
				result.current[1].reset();
			});
			expect(result.current[0]).toBe(initial);
		});
	});

	describe('throws error when count exceeds min and max values', () => {
		let initial = -5;
		const minVal = 0;
		const maxVal = 5;

		beforeEach(() => {
			initial = -5;
		});

		it('when initialCount is smaller than min', () => {
			expect.hasAssertions();

			expect(() => {
				renderHook(({ initialCount, max, min }) => useCounter(initialCount, { max, min }), {
					initialProps: {
						initialCount: initial,
						min: minVal,
						max: maxVal
					}
				});
			}).toThrowError('Initial count cannot be less than min set from options.min');
		});

		it('when initialCount is larger than max', () => {
			initial = 6;
			expect.hasAssertions();

			expect(() => {
				renderHook(({ initialCount, max, min }) => useCounter(initialCount, { max, min }), {
					initialProps: {
						initialCount: initial,
						min: minVal,
						max: maxVal
					}
				});
			}).toThrowError('Initial count cannot be more than max set from options.max');
		});

		it('when larger numbers are passed to set method casuing overflow on conditions', () => {
			initial = 2;
			expect.hasAssertions();

			const { result } = renderHook(({ initialCount, max, min }) => useCounter(initialCount, { max, min }), {
				initialProps: {
					initialCount: initial,
					min: minVal,
					max: maxVal
				}
			});

			expect(() => {
				act(() => {
					result.current[1].set(Infinity);
				});
			}).toThrowError();
		});
	});

	describe('returns the right count value with custom min and max options set', () => {
		const initial = 0;
		const stepCount = 1;
		const minVal = -1;
		const maxVal = 1;

		it('increment by step and check value does not exceed max', () => {
			expect.hasAssertions();
			const { result } = renderHook(
				({ initialCount, step, max, min }) => useCounter(initialCount, { step, min, max }),
				{
					initialProps: {
						initialCount: initial,
						step: stepCount,
						min: minVal,
						max: maxVal
					}
				}
			);

			act(() => {
				result.current[1].increment();
			});

			act(() => {
				result.current[1].increment();
			});

			act(() => {
				result.current[1].increment();
			});

			act(() => {
				result.current[1].increment();
			});

			// shoud not exceed max value
			expect(result.current[0]).toBe(maxVal);
		});

		it('decrement by step and check value does not exceed min', () => {
			expect.hasAssertions();
			const { result } = renderHook(
				({ initialCount, step, min, max }) => useCounter(initialCount, { step, min, max }),
				{
					initialProps: {
						initialCount: initial,
						step: stepCount,
						min: minVal,
						max: maxVal
					}
				}
			);

			act(() => {
				result.current[1].decrement();
			});

			act(() => {
				result.current[1].decrement();
			});

			act(() => {
				result.current[1].decrement();
			});

			act(() => {
				result.current[1].decrement();
			});

			// shoud not exceed min value
			expect(result.current[0]).toBe(minVal);
		});
	});
});
