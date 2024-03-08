import React from 'react';
import { useFreshCallback } from '@abhushanaj/react-hooks';

function useFreshCallbackExample() {
	const [count, setCount] = React.useState(0);

	const increment = () => {
		setCount(count + 1);
	};

	const callback = useFreshCallback(increment);

	React.useEffect(() => {
		const timerId = setInterval(callback, 1000);

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

export default useFreshCallbackExample;
