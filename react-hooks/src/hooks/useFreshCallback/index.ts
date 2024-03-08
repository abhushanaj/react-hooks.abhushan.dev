import { useFreshRef } from '../useFreshRef';

type CallbackWithArgs<T> = (...args: Array<T>) => void;

/**
 * useFreshCallback() - Custom React hook to get the latest and fresh version of function with arguments
 * @param callback
 * @returns
 */
export function useFreshCallback<T>(callback: CallbackWithArgs<T>) {
	const callbackRef = useFreshRef(callback);

	const freshCallback = (...args: Array<T>) => {
		callbackRef.current(...args);
	};

	return freshCallback;
}
