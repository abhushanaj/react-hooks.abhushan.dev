import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-unresolved
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import type { PropsWithChildren } from 'react';

import { useIsClient } from '.';

describe('useIsClient() hook', () => {
	const CLIENT_LABEL = 'Client Only';
	const ISOMORPHIC_LABEL = 'Isomorphic';

	function ClientGate(props: PropsWithChildren) {
		const isClient = useIsClient();
		return isClient ? props.children : null;
	}

	function TestComponent() {
		return (
			<div>
				<button>{ISOMORPHIC_LABEL}</button>
				<ClientGate>
					<button>{CLIENT_LABEL}</button>
				</ClientGate>
			</div>
		);
	}

	it('should be defined', () => {
		expect.hasAssertions();
		expect(useIsClient).toBeDefined();
	});

	it('should return false during SSR', () => {
		// on SSR the button with label client should not exist in markup
		const view = renderToStaticMarkup(<TestComponent />);
		expect(view).not.contain(CLIENT_LABEL);
		expect(view).contain(ISOMORPHIC_LABEL);
	});

	it('should return true on client', () => {
		// on client both buttons must exist on screen
		render(<TestComponent />);

		const isomorphicBtn = screen.getByRole('button', {
			name: ISOMORPHIC_LABEL
		});

		const clientBtn = screen.getByRole('button', {
			name: CLIENT_LABEL
		});

		expect(isomorphicBtn).toBeDefined();
		expect(clientBtn).toBeDefined();
	});
});
