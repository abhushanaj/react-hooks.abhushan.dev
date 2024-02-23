import React from 'react';

import { isWindow } from '../../utils';

/**
 * useIsomorphicLayoutEffect:  A custom React hook that provides an isomorphic (server/client) version of either
 * `useLayoutEffect` or `useEffect` based on the execution environment.
 *
 * @param {React.EffectCallback} effect - The function containing the code to run during the React lifecycle.
 * @param {React.DependencyList | undefined} deps - An array of dependencies for the effect. The effect will only re-run
 * @returns {void}
 *
 * @example
 * // Import the hook
 * import { useIsomorphicLayoutEffect } from '@abhushanaj/react-hooks';
 *
 * // Use the hook in a functional component
 * function MyComponent() {
 *   const [count, setCount] = React.useState(0);
 *
 *   // Define an effect that runs only in the browser environment using useLayoutEffect
 *   useIsomorphicLayoutEffect(() => {
 *     document.title = `Count: ${count}`;
 *   }, [count]);
 *
 *   return (
 *     <div>
 *       <p>Count: {count}</p>
 *       <button onClick={() => setCount(count + 1)}>Increment</button>
 *     </div>
 *   );
 * }
 **/
const useIsomorphicLayoutEffect = isWindow() ? React.useLayoutEffect : React.useEffect;

export { useIsomorphicLayoutEffect };
