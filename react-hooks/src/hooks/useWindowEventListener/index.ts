import type { UseEventListenerCallback, UseEventListenerEventMap, UseEventListenerOptions } from '../_useEventListener';

import { _useEventListener } from '../_useEventListener';
import { useIsClient } from '../useIsClient';

export function useWindowEventListener(
	eventName: keyof UseEventListenerEventMap<Window>,
	callback: UseEventListenerCallback,
	options?: UseEventListenerOptions
) {
	const client = useIsClient();

	return _useEventListener(client ? window : (null as unknown as Window), eventName, callback, options);
}
