import React from 'react';

import type { RefObject } from 'react';

export type UseEventListenerPossibleTargets =
	| Window
	| Document
	| HTMLElement
	| SVGElement
	| RefObject<HTMLElement | SVGElement>
	| Element;

export type UseEventListenerEventMap<Target extends UseEventListenerPossibleTargets> =
	// 1st: When Window
	Target extends Window
		? WindowEventMap
		: // 2nd: When Document
			Target extends Document
			? DocumentEventMap
			: // 3rd HTML Element
				Target extends HTMLElement | RefObject<HTMLElement>
				? HTMLElementEventMap
				: // 4th when SVG element is present
					Target extends SVGElement | RefObject<SVGElement>
					? SVGElementEventMap
					: // end: just send plain old strings
						Record<string, never>;

export type UseEventListenerCallback = EventListenerOrEventListenerObject;
export type UseEventListenerOptions = AddEventListenerOptions | boolean;

/**
 * _useEventListener() - Custom react hook to attach event listeners for a target element or ref object
 *
 */
export function _useEventListener<T extends UseEventListenerPossibleTargets>(
	target: T,
	eventName: keyof UseEventListenerEventMap<T>,
	callback: UseEventListenerCallback,
	options?: UseEventListenerOptions
) {
	const callbackRef = React.useRef(callback);

	/**
	 * This can be rewriiten using the new React.useEFfect event experimental hook
	 * const onCallback=React.useEffectEvent(callback)
	 */
	React.useEffect(() => {
		callbackRef.current = callback;
	});

	React.useEffect(() => {
		const element = (target as RefObject<Element>)?.current || (target as Element);

		if (!element?.addEventListener) {
			return;
		}

		element.addEventListener(eventName as string, callbackRef.current, options);

		return () => {
			element.removeEventListener(eventName as string, callbackRef.current, options);
		};
	}, [eventName, target, options]);
}
