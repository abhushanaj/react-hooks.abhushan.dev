import React from 'react';
import { useCounter, useIsDocumentVisible } from '@abhushanaj/react-hooks';

function UseIsDocumentVisibleExample() {
	const isVisible = useIsDocumentVisible();

	const [tabAwayCount, { increment }] = useCounter(0);

	React.useEffect(() => {
		if (!isVisible) {
			increment();
		}
	}, [isVisible]);

	return (
		<div>
			<p>Tab Away count is : {tabAwayCount}</p>
			<small>Try changing the tab and check the count value</small>
		</div>
	);
}

export default UseIsDocumentVisibleExample;
