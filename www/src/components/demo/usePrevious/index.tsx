import React from 'react';
import { usePrevious } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UsePreviousHookExample() {
	const [count, setCount] = React.useState(0);

	const previousValue = usePrevious(count, -1);

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
				<p className="mt-0">Previous Value: {previousValue}</p>
				<p className="mt-0">Current Value: {count}</p>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button
					onClick={() => {
						setCount(count + 1);
					}}
				>
					Increment by 1
				</Button>

				<Button
					onClick={() => {
						setCount(count - 1);
					}}
				>
					Decrement by 1
				</Button>
			</div>
		</div>
	);
}

export default UsePreviousHookExample;
