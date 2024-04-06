import { useCallbackEvery, useCounter } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseCallbackEveryExample() {
	const [count, { increment }] = useCounter(0);

	const [sampleByTwo, { reset }] = useCallbackEvery(() => {
		increment();
	}, 2);

	return (
		<div>
			<p>Count : {count}</p>

			<div className="my-4 flex items-center justify-center gap-4">
				<Button variant="secondary" onClick={sampleByTwo}>
					Increment by 2
				</Button>

				<Button variant="secondary" onClick={reset}>
					Reset sampling period
				</Button>
			</div>

			<small>The increment by now sample by a period of 2.</small>
		</div>
	);
}

export default UseCallbackEveryExample;
