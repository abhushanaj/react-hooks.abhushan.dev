import { describe, expect, it } from 'vitest';

import { useWindowEventListener } from '.';

/**
 * Other test are not required since this is just a wrapper over _useEventListener which already has the necessary tests
 */
describe('useWindowEventListener() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useWindowEventListener).toBeDefined();
	});
});
