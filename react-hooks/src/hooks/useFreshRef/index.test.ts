import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useFreshRef } from '.';

describe('useFreshRef() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useFreshRef).toBeDefined();
	});

	it('should update the ref with latest function passed', () => {
		const mockedCb1 = vi.fn();
		const mockedCb2 = vi.fn();

		expect.hasAssertions();

		const { result, rerender } = renderHook(({ value }) => useFreshRef(value), {
			initialProps: {
				value: mockedCb1
			}
		});

		expect(result.current.current).toBe(mockedCb1);

		rerender({
			value: mockedCb2
		});

		expect(result.current.current).toBe(mockedCb2);
	});

	it('should update the ref with latest value passed', () => {
		const mockedCb1 = 'Initial Value';
		const mockedCb2 = 'Updated Value';

		expect.hasAssertions();

		const { result, rerender } = renderHook(({ value }) => useFreshRef(value), {
			initialProps: {
				value: mockedCb1
			}
		});

		expect(result.current.current).toBe(mockedCb1);

		rerender({
			value: mockedCb2
		});

		expect(result.current.current).toBe(mockedCb2);
	});
});
