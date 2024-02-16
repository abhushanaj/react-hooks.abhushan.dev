import React from 'react';

function App() {
	const [count, setCount] = React.useState(0);

	return (
		<div>
			<p>Count is : {count}</p>
			<button className="cursor-pointer" onClick={() => setCount((prev) => prev + 1)}>
				Increment by 1
			</button>
		</div>
	);
}

export default App;
