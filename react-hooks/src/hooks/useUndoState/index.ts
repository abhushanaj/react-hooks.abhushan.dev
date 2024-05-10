import { useStateWithHistory } from '../useStateWithHistory';

/**
 * useUndoState() - Custom react hook that undo functionality in state updates.
 * @see - https://react-hooks.abhushan.dev/hooks/state/useundostate/
 */
export const useUndoState = <T>(initialState: T) => {
	/**
	 * Simply a re-export of useStateWithHistory with only undo functionality
	 */
	const [state, { canUndo, undo, set }] = useStateWithHistory(initialState);

	return [
		state,
		{
			canUndo,
			undo,
			set
		}
	] as const;
};
