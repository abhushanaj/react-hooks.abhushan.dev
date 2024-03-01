import React from 'react';

/**
 * useDebounce() - Custom react hooks to debounce (delay execution of a state update) until a specific time period.
 * @see - https://react-hooks.abhushan.dev/hooks/ui/usedebouncedvalue/
 */
export function useDebouncedValue<T>(value: T, wait: number) {
	const [_value, setValue] = React.useState<T | undefined>(undefined);

	const timerRef = React.useRef<number | null>(null);

	const cancelTimer = React.useCallback(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	React.useEffect(() => {
		timerRef.current = window.setTimeout(() => {
			setValue(value);
		}, wait);

		return cancelTimer;
	}, [value, wait, cancelTimer]);

	return [_value, cancelTimer] as const;
}
