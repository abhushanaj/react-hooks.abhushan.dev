import type { PropsWithChildren } from 'react';

export function HookTitle({ children }: PropsWithChildren<{}>) {
	return <p className="text-white text-3xl text-center mb-2">{children}</p>;
}
