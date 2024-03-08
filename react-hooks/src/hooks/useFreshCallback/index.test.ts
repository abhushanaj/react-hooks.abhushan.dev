import { describe, expect, it } from 'vitest';

import { useFreshCallback } from '.';

describe('useFreshCallback() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();
		expect(useFreshCallback).toBeDefined();
	});
});
