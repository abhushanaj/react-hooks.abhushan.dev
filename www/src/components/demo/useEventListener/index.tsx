import React from 'react';
import { useEventListener } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseEventListenerExample() {
	const targetRef = React.useRef<HTMLButtonElement>(null);

	useEventListener(targetRef, 'click', () => {
		alert('Button is clicked');
	});

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<Button ref={targetRef}>Click Me!</Button>
			<small className="block">Click on the button to trigger the event callback.</small>
		</div>
	);
}

export default UseEventListenerExample;
