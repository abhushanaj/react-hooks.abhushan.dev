import type { UseEventListenerCallback, UseEventListenerEventMap, UseEventListenerOptions } from '../_useEventListener';

import { _useEventListener } from '../_useEventListener';
import { useIsClient } from '../useIsClient';

/**
 * useDocumentEventListener() - Custom react hook to attch event listeners to document object.
 * @see - https://react-hooks.abhushan.dev/hooks/dom/usedocumenteventlistener/
 */
export function useDocumentEventListener(
	eventName: keyof UseEventListenerEventMap<Document>,
	callback: UseEventListenerCallback,
	options?: UseEventListenerOptions
) {
	const client = useIsClient();

	return _useEventListener(client ? document : (null as unknown as Document), eventName, callback, options);
}
