import { useWasSSR } from '@abhushanaj/react-hooks';

import ClientGate from '@/components/docs/client-gate';

function Box() {
	const wasSSRed = useWasSSR();
	return (
		<div
			className={`flex size-20 items-center justify-center rounded-md border-2 border-white  text-white ${wasSSRed ? 'bg-green-500' : 'bg-red-500'}`}
		/>
	);
}

function UseWasSSRExample() {
	return (
		<div>
			{/* Markers */}
			<div className="flex list-none items-center justify-center gap-5">
				<div className="flex items-center gap-1">
					<span className="block size-2 bg-green-500" />
					<small>SSR'ed</small>
				</div>

				<div className="flex items-center gap-1">
					<span className="block size-2 bg-red-500" />
					<small>Client Only</small>
				</div>
			</div>

			{/* Box */}
			<div className="mt-8 flex gap-4">
				<Box />
				<ClientGate>
					<Box />
				</ClientGate>
			</div>
		</div>
	);
}

export default UseWasSSRExample;
