import React from 'react';

import { isSSR, noop } from '../../utils';

/**
 * useLockBodyScroll hook - Locks the scrolling of the document body by setting the overflow property to hidden.
 * Useful when you are trying to render a component like dialogs/alerts, which renders the content beneath it inert.
 * @param {boolean} isLocked - Flag indicating whether to lock or unlock the body scroll. Defaults to true
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
	React[isSSR ? 'useEffect' : 'useLayoutEffect'](() => {
		const documentBody = document.body;
		const ogOverflowStyle = getComputedStyle(documentBody).overflow;

		if (isLocked) {
			documentBody.style.overflow = 'hidden';

			return () => {
				documentBody.style.overflow = ogOverflowStyle;
			};
		}

		return noop;
	}, [isLocked]);
}
