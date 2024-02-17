import { useToggle } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UsePreviousHookExample() {
	const [isOn, toggleOn] = useToggle(true);

	return (
		<div className="w-full">
			<div className="my-2 flex flex-col gap-2">
				<p className="mt-0">Current Value: {isOn ? 'true' : 'false'}</p>
			</div>

			<div className="mt-6 flex flex-wrap items-center justify-center gap-8">
				<Button onClick={() => toggleOn()}>{isOn ? 'Toggle to false' : 'Toggle to true'}</Button>
				<Button onClick={() => toggleOn(true)}>Change to true</Button>
				<Button onClick={() => toggleOn(false)}>Change to false</Button>
			</div>
		</div>
	);
}

export default UsePreviousHookExample;
