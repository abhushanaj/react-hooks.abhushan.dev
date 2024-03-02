import type { UseEventListenerCallback, UseEventListenerEventMap, UseEventListenerOptions } from '../_useEventListener';

import { _useEventListener } from '../_useEventListener';

/**
 * useEventListenerOnRef() - Custom react hook to attach event listeners to Elements through it ref objects.
 * @see - https://react-hooks.abhushan.dev/hooks/ui/useeventlisteneronref/
 */
export function useEventListenerOnRef<T extends React.RefObject<HTMLElement | SVGElement>>(
	ref: T,
	eventName: keyof UseEventListenerEventMap<T>,
	callback: UseEventListenerCallback,
	options?: UseEventListenerOptions
) {
	return _useEventListener(ref, eventName, callback, options);
}
