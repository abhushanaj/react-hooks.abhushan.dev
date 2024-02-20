import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useCopyToClipboard } from '.';

describe('useCopyToClipboard', () => {
	// mock the write text function
	const mockedWriteText = vi.fn((_arg: string) => {
		return Promise.resolve();
	});

	// use the mocked write text on navigator clipboard
	Object.assign(navigator, {
		clipboard: {
			writeText: mockedWriteText
		}
	});

	const textToCopy = 'Hello, World!';

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useCopyToClipboard).toBeDefined();
	});

	it('returns null as copied text without the copy function call', () => {
		expect.hasAssertions();
		const { result } = renderHook(() => useCopyToClipboard());
		expect(result.current[0]).toBeNull();
	});

	it('returns the copied text on clipboard', async () => {
		expect.hasAssertions();

		const { result } = renderHook(() => useCopyToClipboard());

		act(() => {
			result.current[1](textToCopy);
			expect(mockedWriteText).toBeCalledWith(textToCopy);
		});

		await waitFor(() => {
			expect(result.current[0]).toBe(textToCopy);
		});
	});

	it('returns null for errors', async () => {
		expect.hasAssertions();

		const { result } = renderHook(() => useCopyToClipboard());

		act(() => {
			mockedWriteText.mockImplementation((_arg: string) => Promise.reject());
			result.current[1](textToCopy);
			expect(mockedWriteText).toBeCalledWith(textToCopy);
		});

		await expect(mockedWriteText).rejects.toBeUndefined();

		// check if the state was correctly returned
		await waitFor(() => {
			expect(result.current[0]).toBe(null);
		});
	});
});
