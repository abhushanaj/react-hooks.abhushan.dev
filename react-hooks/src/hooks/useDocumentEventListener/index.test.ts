import { describe, expect, it } from 'vitest';

import { useDocumentEventListener } from '.';

/**
 * Other test are not required since this is just a wrapper over _useEventListener which already has the necessary tests
 */
describe('useDocumentEventListener() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useDocumentEventListener).toBeDefined();
	});
});
