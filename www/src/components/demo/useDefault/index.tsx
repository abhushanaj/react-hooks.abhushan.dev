import { useDefault } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseDefaultExample() {
	const [count, setCount] = useDefault(1, 0);

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
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

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button
					onClick={() => {
						setCount(null);
					}}
				>
					Set to null
				</Button>

				<Button
					onClick={() => {
						setCount(undefined);
					}}
				>
					Set to undefined
				</Button>
			</div>
		</div>
	);
}

export default UseDefaultExample;
