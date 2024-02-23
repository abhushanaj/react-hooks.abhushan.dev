import React from 'react';

type InitialValues<T> = T | null | undefined;
type DefaultValues<T> = T extends null ? never : T extends undefined ? never : T;

/**
 * useDefault() - Custom react hook that manages a state value with optional default value. Returns the default value whenever state becomes null or undefined.
 * @see - https://react-hooks.abhushan.dev/hooks/state/usedefault/
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
