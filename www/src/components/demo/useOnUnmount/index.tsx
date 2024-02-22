import React from 'react';
import { useCounter, useOnUnmount } from '@abhushanaj/react-hooks';

function SampleComponent({ callback, count }: { callback: () => void; count: number }) {
	useOnUnmount(callback);
	return (
		<p>
			Unmounted: {count} {count >= 2 ? 'times' : 'time'}
		</p>
	);
}
function UseOnUnmountExample() {
	const [count, { increment }] = useCounter(0);
	const [isMounted, setIsMounted] = React.useState(true);

	return (
		<div>
			<div className="my-4 min-h-16 border-2 p-4">
				{isMounted && (
					<SampleComponent
						callback={() => {
							increment();
							console.log('UnMounted');
						}}
						count={count}
					/>
				)}
			</div>

			<div className="flex items-center justify-center gap-2">
				<label htmlFor="unmountComp">{isMounted ? 'Unmount' : 'Mount'}</label>
				<input
					type="checkbox"
					name="unmountComp"
					checked={isMounted}
					id="unmountComp"
					onChange={() => setIsMounted(!isMounted)}
				/>
			</div>

			<small className="block">Try mounting and unmounting the component and see the status of count update.</small>
			<small className="block">Check console for unmount message</small>
		</div>
	);
}

export default UseOnUnmountExample;
