import { useDispatchCustomEvent } from '../useDispatchCustomEvent';
import { useSubscribeToCustomEvent } from '../useSubscribeToCustomEvent';

/**
 * useCustomEvent() - Custom react hook to manage the lifecycle of custom events
 * @see - https://react-hooks.abhushan.dev/hooks/state/usecustomevent/
 */
export const useCustomEvent = <T>(eventName: string, callback: (e: CustomEvent<T>) => void) => {
	const dispatch = useDispatchCustomEvent(eventName);

	const unSub = useSubscribeToCustomEvent(eventName, callback);

	return [dispatch, unSub] as const;
};
