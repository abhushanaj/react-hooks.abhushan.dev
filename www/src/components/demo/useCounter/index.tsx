import { useCounter } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseCounterExample() {
	const [count, { increment, decrement, reset, set }] = useCounter(0, {
		step: 2,
		min: -10,
		max: 10
	});

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
				<p className="mt-0">Counter Value: {count}</p>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button onClick={increment}>Increment by 2</Button>
				<Button onClick={decrement}>Decrement by 2</Button>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button onClick={reset}>Reset to 0</Button>

				<Button
					onClick={() => {
						set(2);
					}}
				>
					Set to 2
				</Button>
			</div>
		</div>
	);
}

export default UseCounterExample;
