import React from 'react';
import { useDocumentTitle } from '@abhushanaj/react-hooks';

function UseDocumentTitleExample() {
	const [count, setCount] = React.useState(0);

	useDocumentTitle(`Count: ${count}`);

	return (
		<div>
			<p>Count is : {count}</p>
			<button
				className="text-blac cursor-pointer rounded-md bg-white px-3 py-2 font-medium"
				onClick={() => setCount((prev) => prev + 1)}
			>
				Increment by 1
			</button>
			<small className="mt-2 block">**Check the document title</small>
		</div>
	);
}

export default UseDocumentTitleExample;
