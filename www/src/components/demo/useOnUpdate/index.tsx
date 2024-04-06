import { useCounter, useOnUpdate } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseOnUpdateExample() {
	const [count, { increment }] = useCounter(0);

	useOnUpdate(() => {
		console.log('Component re-rendered');
	});

	return (
		<div>
			<div className="my-4 min-h-16 border-2 p-4">
				<p>Count Value is : {count}</p>
			</div>

			<Button onClick={increment}>Increment by 1</Button>

			<small className="block">Check console for update messages.</small>
		</div>
	);
}

export default UseOnUpdateExample;
