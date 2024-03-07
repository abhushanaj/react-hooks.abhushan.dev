import React from 'react';
import { useFreshRef } from '@abhushanaj/react-hooks';

function useFreshRefExample() {
	const [count, setCount] = React.useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	const callbackRef = useFreshRef(increment);

	React.useEffect(() => {
		function tick() {
			callbackRef.current();
		}

		const timerId = setInterval(tick, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	return (
		<div>
			<p>Count Value: {count}</p>
		</div>
	);
}

export default useFreshRefExample;
