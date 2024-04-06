import { useCounter, useLifecycleLogger } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseLifecycleLoggerExample() {
	const [count, { increment }] = useCounter(0);

	useLifecycleLogger('Counter', {
		count
	});

	return (
		<div>
			<p>Count: {count}</p>
			<Button onClick={increment}>Increment by 1</Button>
		</div>
	);
}

export default UseLifecycleLoggerExample;
