import React from 'react';

type InitialValues<T> = T | null | undefined;
type DefaultValues<T> = T extends null ? never : T extends undefined ? never : T;

/**
 * useDefault(): React hook that manages a state value with optional default value. Returns the default value whenever state becomes null or undefined
 *
 * @template T - The type of the state value.
 *
 * @param {InitialValues<T>} initialValue - The initial value for the state. Can be `null` or `undefined`.
 * @param {DefaultValues<T>} defaultValue - The default value to use when the state is `null` or `undefined`.
 *
 * @throws {Error} Throws an error if the `defaultValue` is `undefined` or `null`.
 *
 * @returns {[T, React.Dispatch<React.SetStateAction<InitialValues<T>>>]} - A tuple containing the current state value and its setter function.
 *
 * @example
 * import {useDefaultValue} from '@abhushanaj/react-hooks';
 * function App(){
 *   const [selectedFruit, setSelectedFruit]= React.useDefault(person, 'Apples');
 * }
 */
export function useDefault<T>(initialValue: InitialValues<T>, defaultValue: DefaultValues<T>) {
	const [value, setValue] = React.useState<InitialValues<T>>(initialValue);

	if (typeof defaultValue === 'undefined') {
		throw new Error('Default value cannot be undefined');
	}

	if (Object.is(defaultValue, null)) {
		throw new Error('Default value cannot be null');
	}

	if (typeof value === 'undefined' || Object.is(value, null)) {
		return [defaultValue, setValue] as [T, React.Dispatch<React.SetStateAction<InitialValues<T>>>];
	}

	return [value, setValue] as [T, React.Dispatch<React.SetStateAction<InitialValues<T>>>];
}
