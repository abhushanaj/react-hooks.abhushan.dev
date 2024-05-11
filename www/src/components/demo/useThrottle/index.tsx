import React from 'react';
import { useThrottle } from '@abhushanaj/react-hooks';

import type { UseCounterOptions } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

const options: Required<UseCounterOptions> = {
	min: -10,
	max: 10,
	step: 2
};

function UseThrottleExample() {
	const [count, setCount] = React.useState(0);

	const [throttledFn] = useThrottle(() => {
		setCount((prev) => prev + 1);
	}, 1000);

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
				<p className="mt-0">Counter Value: {count}</p>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button onClick={throttledFn} disabled={count >= options.max}>
					Increment by 2
				</Button>
			</div>

			<small>The increment user action is throttled over a duration of 1s.</small>
		</div>
	);
}

export default UseThrottleExample;
