import React from 'react';
import { useEventListenerOnRef } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseEventListenerOnRef() {
	const ref = React.useRef<HTMLButtonElement>(null);

	useEventListenerOnRef(ref, 'click', () => {
		alert('Clicked');
	});

	return (
		<div className="flex flex-col gap-2">
			<Button ref={ref}>Click Me</Button>

			<small>Click on the button to trigger the event</small>
		</div>
	);
}

export default UseEventListenerOnRef;
