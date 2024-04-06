import { useOnMount } from '../useOnMount';
import { useOnUnmount } from '../useOnUnmount';
import { useOnUpdate } from '../useOnUpdate';

/**
 * useLifecycleLogger() - Custom react hook that logs the mounting, unmounting and updates on a component with any additional data provided.
 * @see - https://react-hooks.abhushan.dev/hooks/utilities/uselifecyclelogger/
 */
export const useLifecycleLogger = (name: string, data?: Record<string | number, unknown>) => {
	const log = (type: 'mount' | 'unmount' | 'update') => {
		// eslint-disable-next-line no-console
		console.log(`${name} ${type}:`, data || {});
	};

	useOnMount(() => {
		log('mount');
	});

	useOnUpdate(() => {
		log('update');
	});

	useOnUnmount(() => {
		log('unmount');
	});
};
