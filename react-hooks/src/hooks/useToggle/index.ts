import React from 'react';

/**
 * useToogle- Custom React hook for managing a boolean state and providing a function to toggle it.
 * @template T - typeof the the initial value
 * @param {T} initialValue - the initial value to toggle on
 * @returns {[boolean, (value?: unknown) => void]} Tuple containing the boolean state and a function to toggle the state
 * @example
 * // Example usage of useToggle hook
 * const App = () => {
 *   const [isToggled, toggleState] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <p>Current State: {isToggled ? 'True' : 'False'}</p>
 *       <button onClick={() => toggleState()}>Toggle</button>
 *       <button onClick={() => toggleState(true)}>Set to True</button>
 *       <button onClick={() => toggleState({})}>Toogle the state</button>
 *     </div>
 *   );
 * };
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
