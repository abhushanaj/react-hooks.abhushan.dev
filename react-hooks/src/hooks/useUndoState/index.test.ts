import { describe, expect, it } from 'vitest';

import { useUndoState } from '.';

/**
 * As this is a re-export of useStateWithHistory we don't need tests here. All tests for the parent hook should be enough.
 */
describe('useUndoState() hook', () => {
	it('should be defined', () => {
		expect(useUndoState).toBeDefined();
	});
});
