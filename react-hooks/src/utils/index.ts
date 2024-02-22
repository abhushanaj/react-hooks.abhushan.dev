export const isSSR = typeof window === 'undefined';
export const isWindow = () =>
	typeof window !== 'undefined' &&
	typeof window.document !== 'undefined' &&
	typeof window.document.createElement !== 'undefined';

export function noop() {}
