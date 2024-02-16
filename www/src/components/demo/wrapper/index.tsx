import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
};

export function DemoWrapper({ children }: Props) {
	return (
		<div className="grid p-[2em] text-center items-center justify-center bg-gradient-1 w-full min-h-[450px] rounded-md mt-[2em]  text-white">
			{children}
		</div>
	);
}
