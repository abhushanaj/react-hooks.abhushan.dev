import React from 'react';
import { useWindowEventListener } from '@abhushanaj/react-hooks';

function UseWindowEventListenerExample() {
	const [yScroll, setYScroll] = React.useState<number>(0);

	useWindowEventListener('scroll', () => {
		setYScroll(window.scrollY);
	});

	return (
		<div className="flex flex-col gap-2">
			<p>Y Scroll : {yScroll}px</p>
			<small>Scroll on the window to get the Y scroll position</small>
		</div>
	);
}

export default UseWindowEventListenerExample;
