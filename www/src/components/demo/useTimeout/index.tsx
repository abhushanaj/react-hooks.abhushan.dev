import { useCounter, useInterval, useTimeout } from '@abhushanaj/react-hooks';

function UseTimeoutExample() {
	const [count, { increment, reset }] = useCounter(0);

	const [cancelInterval] = useInterval(
		() => {
			increment();
		},
		1000,
		true
	);

	useTimeout(() => {
		reset();
		cancelInterval();
	}, 5000);

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
				<p className="my-4 border-2 p-4">Counter Value: {count}</p>
				<small>Counter value increments for 5s and then resets back to zero</small>
			</div>
		</div>
	);
}

export default UseTimeoutExample;
