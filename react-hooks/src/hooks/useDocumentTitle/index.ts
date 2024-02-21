import React from 'react';

/**
 * @deprecated - use the new `UseDocumentTitleOptions` type instead.
 * This will be removed in the next major version
 */
export type DocumentTitleOptions = { resetOnUnmount: boolean };
export type UseDocumentTitleOptions = { resetOnUnmount: boolean };

/**
 * @param title - title to set for the document
 * @param  options - options to reset to original title or not. Defaults to false
 * @example
 * function App(){
 *   useDocumentTitle('Welcome');
 *   // usage with the reset option
 *   useDocumentTitle('Welcome', {resetOnUnmount : true });
 * }
 */
export function useDocumentTitle(title: string, options?: UseDocumentTitleOptions) {
	const { resetOnUnmount } = options || { resetOnUnmount: false };

	React.useEffect(() => {
		const ogTitle = document.title;

		if (ogTitle !== title) {
			document.title = title;
		}

		if (resetOnUnmount) {
			document.title = ogTitle;
		}
	}, [title, resetOnUnmount]);
}
