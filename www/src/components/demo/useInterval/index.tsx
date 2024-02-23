import React from 'react';
import { useCounter, useInterval } from '@abhushanaj/react-hooks';

function UseIntervalExample() {
	const [duration, setDuration] = React.useState(1000);
	const [isImmediate, setIsImmediate] = React.useState(true);

	const [count, { increment }] = useCounter(0);

	useInterval(
		() => {
			increment();
		},
		duration,
		isImmediate
	);

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
				{/* Controls for duration of timer */}
				<div>
					<input
						className="accent-white"
						type="range"
						min="1000"
						max="5000"
						step="100"
						value={duration}
						onChange={(e) => {
							setDuration(e.target.valueAsNumber);
						}}
					/>
					<p>Current duration is: {duration} ms</p>
				</div>

				{/* Eagerness of interval */}
				<div>
					<input
						className="accent-white"
						type="checkbox"
						checked={isImmediate}
						onChange={() => {
							setIsImmediate(!isImmediate);
						}}
					/>
					<p>Immediate: {isImmediate.toString()}</p>
				</div>

				<p className="my-4 border-2 p-4">Counter Value: {count}</p>

				<small>Adjust the interval period and whether to call it callback immediately using the controls.</small>
			</div>
		</div>
	);
}

export default UseIntervalExample;
