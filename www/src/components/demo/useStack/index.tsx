import { useStack } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseStackExample() {
	const [stack, { clear, push, pop, size, reset }] = useStack(['Item 1']);

	return (
		<div className="w-full">
			{/* Markers */}
			<div className="flex list-none items-center justify-center gap-2">
				<div className="flex items-center gap-1">
					<span className="block size-2 bg-green-500" />
					<small>Last Item</small>
				</div>
			</div>

			{/* Stack Display */}
			<div className="flex items-center justify-center">
				<div className="my-4 flex max-h-64 max-w-[80%] items-center justify-center gap-4 overflow-x-auto pb-4">
					{stack.map((i, index) => (
						<div
							className={`flex min-h-[50px] min-w-[50px] items-center justify-center rounded-md border-2 border-white p-3 ${index === stack.length - 1 ? 'bg-green-500' : ''}`}
							key={index}
						>
							{i}
						</div>
					))}
				</div>
			</div>

			{/* Actions on stack */}
			<div className="mb-6 mt-4 flex items-center justify-center gap-4">
				<Button
					variant="secondary"
					onClick={() => {
						push('New Item');
					}}
				>
					Push New Item
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						clear();
					}}
				>
					Clear
				</Button>

				<Button
					variant="secondary"
					onClick={() => {
						reset();
					}}
				>
					Reset
				</Button>
				<Button
					variant="secondary"
					onClick={() => {
						pop();
					}}
				>
					Pop
				</Button>
			</div>

			{/* Meta Information */}
			<small className="block">Size: {size}</small>
			<small className="block">Try adding and removing items on the stack.</small>
		</div>
	);
}

export default UseStackExample;
