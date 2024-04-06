# React Hooks

<img src="../react-hooks-thumbnail.png" />

---

> The project is under development.

A collection of modern, server-safe custom React hooks to supercharge your React application development.

Find useful reusable abstractions for browser API's, custom utilities to manage states, create and cleanup subscription to external stores or in general encapsulate often repeated business logic.

## Installation

To get started, you need to install the package. Use one of the following commands based on your package manage

```bash
npm install @abhushanaj/react-hooks
```

## Usage

### Import a hook

All hooks are named exports, so importing them is straightforward.

```tsx
import { useDocumentTitle } from '@abhushanaj/react-hooks;
```

### Import multiple hooks.

You can also import multiple hooks at once.

```tsx
import { useDocumentTitle, useToggle } from '@abhushanaj/react-hooks;
```

## Example

Now that you’ve installed and imported the hooks, you can use them in your components.

```jsx
import React from 'react';
import { useDocumentTitle } from '@abhushanaj/react-hooks';

function App() {
	const [count, setCount] = React.useState(0);
	useDocumentTitle(`Current count is: ${count}`, { resetOnUnmount: true });

	return (
		<section>
			<h1>Update document title to show the latest count</h1>
			<button onClick={() => setCount((prev) => prev + 1)}>Increment Count: {count}</button>
		</section>
	);
}
```

## Documentation

Visit [react-hooks.abhushan.dev](https://react-hooks.abhushan.dev/) for more information about the package.

## Issues & Improvements

Visit [Github Issues](https://github.com/abhushanaj/react-hooks.abhushan.dev/issues) and feel free to raise an issue.
