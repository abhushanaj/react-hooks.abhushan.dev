import { useStateWithHistory } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseStateWithHistoryExample() {
	const [count, { canRedo, canUndo, redo, undo, set, reset }] = useStateWithHistory(0);

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
				<Button
					onClick={() => {
						set(count * 3);
					}}
				>
					*3
				</Button>
				<Button
					onClick={() => {
						set(count / 2);
					}}
				>
					/2
				</Button>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button variant="secondary" onClick={undo} disabled={!canUndo}>
					Undo
				</Button>
				<Button variant="secondary" onClick={redo} disabled={!canRedo}>
					Redo
				</Button>
				<Button variant="secondary" onClick={reset}>
					Reset
				</Button>
			</div>
		</div>
	);
}

export default UseStateWithHistoryExample;
