<h1 align="center">React Hooks by Abhushan </h1>

</br>

<img src="./react-hooks-thumbnail.png" />

</br>

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

## List of Available Hooks

### DOM

1. [useDocumentEventListener](https://react-hooks.abhushan.dev/hooks/dom/usedocumenteventlistener/): Adds an event listener to the document object.

1. [useDocumentTitle](https://react-hooks.abhushan.dev/hooks/dom/usedocumenttitle/): Dynamically update the document title of a webpage.

1. [useIsDocumentVisible](https://react-hooks.abhushan.dev/hooks/dom/useisdocumentvisible/): Tracks document visibility using the `document.visibilityState` property.

### BOM

1. [useCopyToClipboard](https://react-hooks.abhushan.dev/hooks/bom/usecopytoclipboard/): Copy text content to clipboard.

1. [useNavigatorLanguage](https://react-hooks.abhushan.dev/hooks/bom/usenavigatorlanguage/): Get the preferred language set by the user in browser settings.

1. [useOnline](https://react-hooks.abhushan.dev/hooks/bom/useonline/): Detect the current online status of the browser.

### Window

1. [useOuterWindowSize](https://react-hooks.abhushan.dev/hooks/window/useouterwindowsize/): Get and track the dimensions of the outer window.

1. [useWindowEventListener](https://react-hooks.abhushan.dev/hooks/window/usewindoweventlistener/): Adds an event listener to the window object.

1. [useWindowSize](https://react-hooks.abhushan.dev/hooks/window/usewindowsize/): Get and track the dimensions of the window from your component.

### State

1. [useCounter](https://react-hooks.abhushan.dev/hooks/state/usecounter/): Manage a counter value with custom min, max and step properties.

1. [useCycleOn](https://react-hooks.abhushan.dev/hooks/state/usecycleon/): Cycle through a list of values.

1. [useDefault](https://react-hooks.abhushan.dev/hooks/state/usedefault/): Sets a default value to a state when it is null or undefined.

1. [useList](https://react-hooks.abhushan.dev/hooks/state/uselist/): Manage a list of items.

1. [usePrevious](https://react-hooks.abhushan.dev/hooks/state/useprevious/): Track the previous value of a variable.

1. [useQueue](https://react-hooks.abhushan.dev/hooks/state/usequeue/): Manage a queue of items.

1. [useStack](https://react-hooks.abhushan.dev/hooks/state/usestack/): Manage a stack of items.

1. [useStateWithHistory](https://react-hooks.abhushan.dev/hooks/state/usestack/): Manage a state value with it's entire history of updates.

1. [useToggle](https://react-hooks.abhushan.dev/hooks/state/usetoggle/): Toogle a boolean value.

1. [useUndoState](https://react-hooks.abhushan.dev/hooks/state/usestack/): Manage a state value with ability to undo an update

### User Interface (UI)

1. [useEventListenerOnRef](https://react-hooks.abhushan.dev/hooks/ui/useeventlisteneronref/): Adds an event listener to a element through the ref object.

1. [useLockBodyScroll](https://react-hooks.abhushan.dev/hooks/ui/uselockbodyscroll/): Lock the scroll of document body by setting the overflow property to hidden.

1. [useMediaQuery](https://react-hooks.abhushan.dev/hooks/ui/usemediaquery/): Match a media query against the document.

### Effects and Lifecycles

1. [useEffectOnlyOnceWhen](https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useeffectonlyoncewhen/): Runs a callback effect once when condition is met or is met in future.

1. [useIsomorphicLayoutEffect](https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useisomorphiclayout/): Hook that resolves to useEffect on the server and useLayoutEffect on the client.

1. [useOnMount](https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useonmount/): Run a callback after a component mounts using the useOnMount hook.

1. [useOnUnmount](https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useonunmount/): Run a callback after a component unmounts using the useOnUnmount hook.

1. [useOnUpdate](https://react-hooks.abhushan.dev/hooks/effects-and-lifecycles/useonupdate/): Runs a callback on every component update or re-render.

## Timers

1. [useInterval](https://react-hooks.abhushan.dev/hooks/timers/useinterval/): Manage intervals conveniently using the useInterval hook.

1. [useIntervalWhen](https://react-hooks.abhushan.dev/hooks/timers/useintervalwhen/): Manage intervals against a flag conveniently using the useIntervalWhen hook.

1. [useTimeout](https://react-hooks.abhushan.dev/hooks/timers/usetimeout/): Manage timeouts conveniently using the useTimeout hook.

## Utilities

1. [useDebounce](https://react-hooks.abhushan.dev/hooks/utilities/usewasssr/): Debounce a callback function over a wait (ms) period.

1. [useDebouncedValue](https://react-hooks.abhushan.dev/hooks/utilities/usedebouncedvalue/): Delay execution of a state update until a defined time period.

1. [useFreshCallback](https://react-hooks.abhushan.dev/hooks/utilities/usefreshcallback/): Returns the latest and fresh callback function.

1. [useFreshRef](https://react-hooks.abhushan.dev/hooks/utilities/usefreshref/): Returns a ref with the latest and fresh value passed to it.

1. [useIsClient](https://react-hooks.abhushan.dev/hooks/utilities/useisclient/): Returns a boolean flag to mark if code in running on client side.

1. [useLifecycleLogger](https://react-hooks.abhushan.dev/hooks/utilities/uselifecyclelogger/): Log messages for different lifecycles of a component with additional data.

1. [useLimitCallback](https://react-hooks.abhushan.dev/hooks/utilities/uselimitcallback/): Limit invocations of a callback to at max period count.

1. [useSampleCallback](https://react-hooks.abhushan.dev/hooks/utilities/usesamplecallback/): Limits the invocation of a callback to every period samples.

1. [useThrottle](https://react-hooks.abhushan.dev/hooks/utilities/usewasssr/): Throttle a callback function over a duration(ms) period.

1. [useWasSSR](https://react-hooks.abhushan.dev/hooks/utilities/usewasssr/): Indicates whether the component was SSR'ed or not.

## Project Structure

The project is a monorepo setup created from the `create-turbo` CLI starter contains two main workspaces:

1. `www`: the documentation site for the `@abhushanaj/react-hooks`.
2. `react-hooks`: the actual npm package for `@abhushanaj/react-hooks` which is shipped to npm registry.

## Versioning using changeset

The versioning for the `@abhushanaj/react-hooks` is managed using changeset CLI and adheres to semver at all times.

**Only react-hooks** package follows this versioning system.

Whenever a new change is made on the `react-hooks` workspace a equivalent `changeset` is created using the `pnpm changeset` command. Any additional information for the changes can be added as well during changset creation.

All changesets are then merged into one release server using the `pnpm changeset version` command and published to npm using `pnpm changeset publish` command.

Learn more about changesets from [official repo](https://github.com/changesets/changesets).

> Automating this through Github Actions, is planned in future after a major release is achieved.

## Developing Locally

The active branch for development is `develop`. All changes to the project are merged to this branch.

The latest release branch is `main`. All new releases are triggered from this branch and tagged.
