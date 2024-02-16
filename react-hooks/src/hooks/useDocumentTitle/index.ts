import React from 'react';

/**
 * @param title - title to set for the document
 * @param  options - options to reset to original title or not. Defaults to false
 * @example
 * function App(){
 *   useDocumentTitle('Welcome');
 *   // usage with the reset option
 *   useDocumentTitle('Welcome', {resetOnUnMount : true });
 * }
 */
export function useDocumentTitle(title: string, options?: { resetOnUnMount: boolean }) {
	const { resetOnUnMount } = options || { resetOnUnMount: false };

	React.useEffect(() => {
		const ogTitle = document.title;

		if (ogTitle !== title) {
			document.title = title;
		}

		if (resetOnUnMount) {
			document.title = ogTitle;
		}
	}, [title, resetOnUnMount]);
}
