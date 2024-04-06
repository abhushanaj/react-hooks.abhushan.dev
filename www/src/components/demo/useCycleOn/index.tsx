import { useCycleOn } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseCycleOnExample() {
	const [currentFruit, { forward, backward, reset }] = useCycleOn(['🍎', '🍌', '🍐', '🍑']);

	return (
		<div>
			<p className="mb-6">Fruits List : {['🍎', '🍌', '🍐', '🍑'].toString()}</p>

			<p>Current Fruit is : {currentFruit}</p>

			<div className="my-2 flex items-center justify-center gap-2">
				<Button onClick={forward}>Forward</Button>
				<Button onClick={backward}>Backward</Button>
				<Button onClick={reset}>Reset</Button>
			</div>

			<small>Interact with the control to cycle through the fruits list</small>
		</div>
	);
}

export default UseCycleOnExample;
