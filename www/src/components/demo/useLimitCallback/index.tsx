import { useCounter, useLimitCallback } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseLimitCallbackExample() {
	const [count, { increment }] = useCounter(0);

	const [limitTwice, { reset }] = useLimitCallback(() => {
		increment();
	}, 2);

	return (
		<div>
			<p>Count : {count}</p>

			<div className="my-4 flex items-center justify-center gap-4">
				<Button variant="secondary" onClick={limitTwice}>
					Increment by 1
				</Button>

				<Button variant="secondary" onClick={reset}>
					Reset
				</Button>
			</div>

			<small>The increment function is limited to only 2 times if no reset is done.</small>
		</div>
	);
}

export default UseLimitCallbackExample;
