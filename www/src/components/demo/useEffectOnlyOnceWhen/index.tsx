import React from 'react';
import { useEffectOnlyOnceWhen } from '@abhushanaj/react-hooks';

function UseEffectOnlyOnceWhenExample() {
	const [isLoading, setIsLoading] = React.useState(true);

	useEffectOnlyOnceWhen(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}, isLoading);

	return (
		<div>
			<p>{isLoading ? 'Loading...' : 'Finished Loading.'}</p>
			<p>Status: {isLoading ? '⚒️' : '✅'}</p>
			<small className="block">It should stop loading after 3 seconds.</small>
		</div>
	);
}

export default UseEffectOnlyOnceWhenExample;
