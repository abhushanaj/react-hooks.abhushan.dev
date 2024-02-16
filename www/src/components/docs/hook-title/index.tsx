import type { PropsWithChildren } from 'react';

export function HookTitle({ children }: PropsWithChildren<{}>) {
	return <p className="mb-6 text-center text-3xl text-white">{children}</p>;
}
