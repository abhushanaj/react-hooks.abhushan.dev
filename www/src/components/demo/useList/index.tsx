import { useList } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseListExample() {
	const [list, { updateAt, removeAt, reset, size, set }] = useList([0, 1, 2, 3]);

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
			</div>

			{/* Queue Display */}
			<div className="flex items-center justify-center">
				<div className="my-4 flex min-h-16 max-w-[80%] items-center justify-center gap-4 overflow-x-auto pb-4">
					{list.map((i, ind) => (
						<div
							className={`flex min-h-[50px] min-w-[50px] items-center justify-center rounded-md border-2 border-white p-3 ${ind === size - 1 ? 'bg-yellow-500' : ''} ${ind === 0 ? 'bg-green-500' : ''}`}
							key={ind}
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
						updateAt(0, 4);
					}}
				>
					Update index 0 with 4
				</Button>

				<Button
					variant="secondary"
					onClick={() => {
						set([10, 11, 12]);
					}}
				>
					Set [10,11,12]
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
					disabled={size <= 2}
					onClick={() => {
						removeAt(2);
					}}
				>
					Remove from index 2
				</Button>
			</div>

			{/* Meta Information */}
			<small className="block">Size: {size}</small>
			<small className="block">Try adding and removing items on the list.</small>
		</div>
	);
}

export default UseListExample;
