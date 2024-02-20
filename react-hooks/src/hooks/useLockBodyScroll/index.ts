import React from 'react';

/**
 * useLockBodyScroll hook - Locks the scrolling of the document body by setting the overflow property to hidden.
 * Useful when you are trying to render a component like dialogs/alerts, which renders the content beneath it inert.
 *
 * @example
 * function Dialog() {
 *     useLockBodyScroll();
 *     return (
 *         <div role="dialog">
 * 					/// You dialog content
 *         </div>
 *     );
 * }
 */
export function useLockBodyScroll(isLocked = true) {
	React.useLayoutEffect(() => {
		const documentBody = document.body;
		const ogOverflowStyle = getComputedStyle(documentBody).overflow;

		if (isLocked) {
			documentBody.style.overflow = 'hidden';

			return () => {
				documentBody.style.overflow = ogOverflowStyle;
			};
		}

		return () => {};
	}, [isLocked]);
}
