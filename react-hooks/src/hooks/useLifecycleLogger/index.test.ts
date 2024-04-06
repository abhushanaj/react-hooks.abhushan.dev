import { describe, expect, it } from 'vitest';

import { useLifecycleLogger } from '.';

describe('useLifecycleLogger() hook', () => {
	it('should be defined', () => {
		expect(useLifecycleLogger).toBeDefined();
	});
});
