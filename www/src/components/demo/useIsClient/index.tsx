import ClientGate from '@/components/docs/client-gate';

function Box({ isClientOnly }: { isClientOnly: boolean }) {
	return (
		<div
			className={`flex size-20 items-center justify-center rounded-md border-2 border-white text-white ${isClientOnly ? 'bg-green-500' : 'bg-pink-500'}`}
		/>
	);
}

function UseIsClientExample() {
	return (
		<div>
			{/* Markers */}
			<div className="flex list-none items-center justify-center gap-5">
				<div className="flex items-center gap-1">
					<span className="block size-2 bg-pink-500" />
					<small>Isomorphic</small>
				</div>

				<div className="flex items-center gap-1">
					<span className="block size-2 bg-green-500" />
					<small>Client Only</small>
				</div>
			</div>

			{/* Box */}
			<div className="mb-2 mt-8 flex items-center justify-center gap-4">
				<Box isClientOnly={false} />
				<ClientGate>
					<Box isClientOnly />
				</ClientGate>
			</div>

			<small>Try refreshing the page to see the client only component render after a delay.</small>
		</div>
	);
}

export default UseIsClientExample;
