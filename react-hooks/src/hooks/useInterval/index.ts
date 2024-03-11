import { useIntervalWhen } from '../useIntervalWhen';

/**
 * useInterval() - Custom react hook to invoke a callback function after a minimum delay (ms) using the setInterval method.
 * @see - https://react-hooks.abhushan.dev/hooks/timers/useinterval/
 */
export function useInterval(callback: () => void, duration = 0, immediate = false) {
	return useIntervalWhen(callback, duration, immediate, true);
}
