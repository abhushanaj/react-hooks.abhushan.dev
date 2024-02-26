import React from 'react';

/**
 * @deprecated - use the new `UseDocumentTitleOptions` type instead.
 * This will be removed in the next major version
 */
export type DocumentTitleOptions = { resetOnUnmount: boolean };
export type UseDocumentTitleOptions = { resetOnUnmount: boolean };

/**
 * useDocumentTitle() - Custom react hook to dynamically update the document title.
 * @see - https://react-hooks.abhushan.dev/hooks/dom/usedocumenttitle/
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
