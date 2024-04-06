import { useCounter, useSampleCallback } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseSampleCallbackExample() {
	const [count, { increment }] = useCounter(0);

	const [sampleByTwo, { reset }] = useSampleCallback(() => {
		increment();
	}, 2);

	return (
		<div>
			<p>Count : {count}</p>

			<div className="my-4 flex items-center justify-center gap-4">
				<Button variant="secondary" onClick={sampleByTwo}>
					Increment by 1
				</Button>

				<Button variant="secondary" onClick={reset}>
					Reset
				</Button>
			</div>

			<small>Increment is now sampled by a period of 2.</small>
		</div>
	);
}

export default UseSampleCallbackExample;
