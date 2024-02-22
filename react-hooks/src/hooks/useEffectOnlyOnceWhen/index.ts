import React from 'react';

/**
 * useEffectOnlyOnceWhen() - React hook to execute a callback function only once when a specified condition becomes true.
 *
 * @param {()=>void} callback - The callback function to be executed.
 * @param {boolean} condition - The condition that triggers the callback execution.
 *
 * @example
 * // Import the hook
 * import { useEffectOnlyOnceWhen } from '@abhushanaj/react-hooks';
 *
 * // Usage within a functional component
 * function ExampleComponent() {
 *   const [isConditionMet, setConditionMet] = React.useState(false);
 *
 *   // Define the callback function to be executed
 *   const callbackFunction = () => {
 *     console.log('Callback executed!');
 *   };
 *
 *   // Use the custom hook with the callback and condition
 *   useEffectOnlyOnceWhen(callbackFunction, isConditionMet);
 *
 *   React.useEffect(() => {
 *     // Simulate condition becoming true after 3000 milliseconds
 *     setTimeout(() => {
 *       setConditionMet(true);
 *     }, 3000);
 *   }, []);
 *
 *   return (
 *     <div>
 *      /// your component
 *     </div>
 *   );
 * }
 */
export function useEffectOnlyOnceWhen(callback: () => void, condition: boolean) {
	const callbackRef = React.useRef(callback);
	const isCalledOnceRef = React.useRef(false);

	React.useEffect(() => {
		callbackRef.current = callback;
	});

	React.useEffect(() => {
		if (condition && !isCalledOnceRef.current) {
			callbackRef.current();
			isCalledOnceRef.current = true;
		}
	}, [condition]);
}
