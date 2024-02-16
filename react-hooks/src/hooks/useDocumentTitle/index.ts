import React from 'react';

export type DocumentTitleOptions = { resetOnUnmount: boolean };

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
export function useDocumentTitle(title: string, options?: DocumentTitleOptions) {
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
