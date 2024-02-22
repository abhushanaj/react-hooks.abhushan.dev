import { useCounter, useQueue } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseQueueExample() {
	const [queue, { add, clear, firstItem, lastItem, remove, size }] = useQueue([0]);

	const [count, { increment, set }] = useCounter(queue.length);

	return (
		<div className="w-full">
			{/* Markers */}
			<div className="flex list-none items-center justify-center gap-2">
				<div className="flex items-center gap-1">
					<span className="block size-2 bg-green-500" />
					<small>First Item</small>
				</div>

				<div className="flex items-center gap-1">
					<span className="block size-2 bg-yellow-500" />
					<small>Last Item</small>
				</div>

				<div className="flex items-center gap-1">
					<span className="block size-2 bg-pink-500" />
					<small>Single Item</small>
				</div>
			</div>

			{/* Queue Display */}
			<div className="flex items-center justify-center">
				<div className="my-4 flex min-h-16 max-w-[80%] items-center justify-center gap-4 overflow-x-auto pb-4">
					{queue.map((i) => (
						<div
							className={`flex min-h-[50px] min-w-[50px] items-center justify-center rounded-md  border-2 border-white p-3 ${i === lastItem ? 'bg-yellow-500' : ''} ${i === firstItem ? 'bg-green-500' : ''} ${firstItem === lastItem ? 'bg-pink-500' : ''}`}
							key={i}
						>
							{i}
						</div>
					))}
				</div>
			</div>

			{/* Actions on queue */}
			<div className="mb-6 mt-4 flex items-center justify-center gap-4">
				<Button
					variant="secondary"
					onClick={() => {
						add(count);
						increment();
					}}
				>
					Add
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						clear();
						set(0);
					}}
				>
					Clear
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						remove();
					}}
				>
					Remove
				</Button>
			</div>

			{/* Meta Information */}
			<small className="block">Size: {size}</small>
			<small className="block">Try adding and removing items on the queue.</small>
		</div>
	);
}

export default UseQueueExample;
