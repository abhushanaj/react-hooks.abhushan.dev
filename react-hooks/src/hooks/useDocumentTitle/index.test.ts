import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useDocumentTitle } from '.';

describe('useDocumentTitle() hook', () => {
	const ogTitle = 'Initial Title';

	beforeEach(() => {
		document.title = ogTitle;
	});

	it('should be defined', () => {
		expect(useDocumentTitle).toBeDefined();
	});

	describe('should set the document title with passed argument', () => {
		it('on initial render', () => {
			expect.hasAssertions();

			const initialTitle = 'Updated Title';

			renderHook(({ title }) => useDocumentTitle(title), {
				initialProps: {
					title: initialTitle
				}
			});

			expect(document.title).toBe(initialTitle);
		});

		it('on re-render', () => {
			const initialTitle = 'Updated Title';

			expect.hasAssertions();

			const { rerender } = renderHook(({ title }) => useDocumentTitle(title), {
				initialProps: {
					title: initialTitle
				}
			});

			expect(document.title).toBe(initialTitle);

			const updatedTitle = 'Updated title';

			rerender({
				title: updatedTitle
			});

			expect(document.title).toBe(updatedTitle);
		});
	});

	describe('should respect the resetOnUnmount passed', () => {
		it('reset to original when resetOnUnmount set to true', () => {
			let updatedTitle = 'Updated Title';

			expect.hasAssertions();

			const { unmount, rerender } = renderHook(({ title, options }) => useDocumentTitle(title, options), {
				initialProps: {
					title: updatedTitle,
					options: {
						resetOnUnmount: true
					}
				}
			});

			updatedTitle = 'Re-render';

			rerender({
				title: updatedTitle,
				options: {
					resetOnUnmount: true
				}
			});

			unmount();

			expect(document.title).toBe(ogTitle);
		});

		it('should not reset to original resetOnUnmount set to false', () => {
			const updatedTitle = 'Updated Title';

			expect.hasAssertions();

			const { unmount } = renderHook(({ title, options }) => useDocumentTitle(title, options), {
				initialProps: {
					title: updatedTitle,
					options: {
						resetOnUnmount: false
					}
				}
			});

			unmount();

			expect(document.title).toBe(updatedTitle);
		});
	});
});
