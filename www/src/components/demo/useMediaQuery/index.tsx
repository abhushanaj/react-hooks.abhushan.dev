import { useMediaQuery } from '@abhushanaj/react-hooks';

function Box({ query }: { query: string }) {
	const isMatch = useMediaQuery(query);

	return (
		<div
			className={`size-20 border-2 border-white ${isMatch ? 'bg-green-500' : ''} flex flex-wrap items-center justify-center rounded-md`}
		>
			<small className="text-white">{query}</small>
		</div>
	);
}

function UseMediaQueryExample() {
	return (
		<div>
			<div className="flex gap-4">
				<Box query="(max-width: 600px)" />
				<Box query="(max-width: 768px)" />
				<Box query="(min-width: 320px)" />
			</div>

			<small className="mt-4 block">Resize the document to see changes in query states.</small>
		</div>
	);
}

export default UseMediaQueryExample;
