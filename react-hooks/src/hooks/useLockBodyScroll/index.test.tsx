import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useLockBodyScroll } from '.';

function TestComponent({ isLocked = true }: { isLocked?: boolean }) {
	useLockBodyScroll(isLocked);

	return (
		<div>
			<button>Unlock body scroll</button>
		</div>
	);
}

describe('useLockBodyScroll() hook', () => {
	it('should be defined', () => {
		expect.hasAssertions();

		expect(useLockBodyScroll).toBeDefined();
	});

	it('locks the body scroll by setting overflow:hidden by default', () => {
		expect.hasAssertions();
		const { unmount } = render(<TestComponent />);
		expect(document.body.style.overflow).toBe('hidden');
		unmount();
	});

	it('resets to original property for overflow on unmount by default', () => {
		expect.hasAssertions();
		const intialOverFlow = document.body.style.overflow;
		const { unmount } = render(<TestComponent />);

		unmount();
		expect(document.body.style.overflow).toBe(intialOverFlow);
	});

	it('does not lock the scroll when isLocked is passed as false', () => {
		expect.hasAssertions();
		const intialOverFlow = document.body.style.overflow;
		const { unmount } = render(<TestComponent isLocked={false} />);
		expect(document.body.style.overflow).toBe(intialOverFlow);
		unmount();
	});

	it('keeps the original overflow property after unmount with isLocked as false', () => {
		expect.hasAssertions();
		const intialOverFlow = document.body.style.overflow;
		const { unmount } = render(<TestComponent isLocked={false} />);
		unmount();
		expect(document.body.style.overflow).toBe(intialOverFlow);
	});
});
