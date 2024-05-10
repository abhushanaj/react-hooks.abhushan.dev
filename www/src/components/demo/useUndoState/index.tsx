import { useUndoState } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseUndoStateExample() {
	const [count, { canUndo, undo, set, reset }] = useUndoState(0);

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
				<p className="mt-0">Count Value: {count}</p>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button
					onClick={() => {
						set(count + 1);
					}}
				>
					+1
				</Button>
				<Button
					onClick={() => {
						set(count - 2);
					}}
				>
					-2
				</Button>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button variant="secondary" onClick={undo} disabled={!canUndo}>
					Undo
				</Button>
				<Button variant="secondary" onClick={reset}>
					Reset
				</Button>
			</div>
		</div>
	);
}

export default UseUndoStateExample;
