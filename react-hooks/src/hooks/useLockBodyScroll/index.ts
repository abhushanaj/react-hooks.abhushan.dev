import { noop } from '../../utils';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * useLockBodyScroll() - Custom react hook that locks the scrolling of the document body by setting the overflow property to hidden.
 * Useful when you are trying to render a component like dialogs/alerts, which renders the content beneath it inert.
 * @see - https://react-hooks.abhushan.dev/hooks/ui/uselockbodyscroll/
 * */
export function useLockBodyScroll(isLocked = true) {
	useIsomorphicLayoutEffect(() => {
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
