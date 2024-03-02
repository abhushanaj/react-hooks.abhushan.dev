import { describe, expect, it } from 'vitest';

import { useEventListenerOnRef } from '.';

/**
 * Other test are not required since this is just a wrapper over _useEventListener which already has the necessary tests
 */
describe('useEventListenerOnRef()', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useEventListenerOnRef).toBeDefined();
	});
});
