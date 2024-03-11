import { describe, expect, it } from 'vitest';

import { useInterval } from '.';

/**
 * As the useInterval is just a wrapper over the useIntervalWhen hook,
 * we don't need test here as they will be covered on the useIntervalWhen.
 */
describe('useInterval() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useInterval).toBeDefined();
	});
});
