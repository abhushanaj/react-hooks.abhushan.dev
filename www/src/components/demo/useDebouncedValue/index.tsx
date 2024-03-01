import React from 'react';
import { useDebouncedValue } from '@abhushanaj/react-hooks';

function UseDebouncedValueExample() {
	const [enteredText, setEnteredText] = React.useState('');

	const [searchText] = useDebouncedValue(enteredText, 200);

	return (
		<div>
			<div className="flex flex-col gap-2">
				<label htmlFor="search">Enter your search query</label>
				<input
					type="search"
					id="search"
					name="search"
					value={enteredText}
					onChange={(e) => {
						setEnteredText(e.target.value);
					}}
					className="w-full rounded-md px-4 py-2"
				/>
			</div>

			{searchText && <p className="min-h-[20px]">Debounced search term {searchText} ...</p>}

			<small>Search Query is debounced at 200ms</small>
		</div>
	);
}

export default UseDebouncedValueExample;
