import React, { useReducer } from 'react';

type State<T> = {
	present: T;
	past: Array<T>;
	future: Array<T>;
};

type ReducerActions<T> =
	| {
			type: 'SET';
			payload: {
				newPresent: T;
			};
	  }
	| {
			type: 'UNDO';
	  }
	| {
			type: 'REDO';
	  }
	| {
			type: 'RESET';
			payload: {
				initialPresent: T;
			};
	  };

const reducer = <T>(state: State<T>, action: ReducerActions<T>): State<T> => {
	const { future, past, present } = state;

	switch (action.type) {
		case 'SET': {
			const { newPresent } = action.payload;

			return {
				future: [], // clear future value
				present: newPresent,
				past: [...past, present] // add current state to past
			};
		}

		case 'UNDO': {
			if (past.length === 0) {
				return state; // Nothing to undo
			}

			const newPast = past.slice(0, -1); // Remove last element from past

			return {
				present: past[past.length - 1]!, // Get the previous state from past
				future: [present, ...future], // Move present state to start of future
				past: newPast
			};
		}

		case 'REDO': {
			if (future.length === 0) {
				return state; // Nothing to redo
			}

			const newFuture = future.slice(1); // Remove first element from future

			return {
				present: future[0]!, // Get the next state from future
				future: newFuture,
				past: [...past, present]
			};
		}

		case 'RESET': {
			const { initialPresent } = action.payload;

			return {
				future: [],
				past: [],
				present: initialPresent
			};
		}

		default: {
			throw new Error('Unsupported action dispatched on the reducer. Check possible action types');
		}
	}
};

/**
 * useStack() - Custom react hook to manage a state with it's history.
 * @see - https://react-hooks.abhushan.dev/hooks/state/usestatewithhistory/
 */
export const useStateWithHistory = <T>(initialValue: T) => {
	const [{ present, future, past }, dispatch] = useReducer(reducer as React.Reducer<State<T>, ReducerActions<T>>, {
		present: initialValue,
		past: [] as Array<T>,
		future: [] as Array<T>
	});

	const set = React.useCallback((newPresent: T) => {
		dispatch({
			type: 'SET',
			payload: {
				newPresent
			}
		});
	}, []);

	const undo = React.useCallback(() => {
		dispatch({
			type: 'UNDO'
		});
	}, []);

	const redo = React.useCallback(() => {
		dispatch({ type: 'REDO' });
	}, []);

	const reset = React.useCallback(() => {
		dispatch({
			type: 'RESET',
			payload: {
				initialPresent: initialValue
			}
		});
	}, [initialValue]);

	return [
		present,
		{
			canUndo: past.length !== 0,
			canRedo: future.length !== 0,
			redo,
			undo,
			set,
			reset,
			_past: past,
			_future: future
		}
	] as const;
};
