import React from 'react';

/**
 * useToogle() - Custom react hook for managing a boolean state and providing a function to toggle it.
 * @see - https://react-hooks.abhushan.dev/hooks/state/usetoggle/
 */
export function useToggle<T>(initialValue: T) {
	const [state, setState] = React.useState(typeof initialValue === 'boolean' ? initialValue : Boolean(initialValue));

	const toogleState = React.useCallback((value?: unknown) => {
		if (typeof value !== 'boolean') {
			setState((prev) => !prev);
		} else {
			setState(value);
		}
	}, []);

	return [state, toogleState] as const;
}
