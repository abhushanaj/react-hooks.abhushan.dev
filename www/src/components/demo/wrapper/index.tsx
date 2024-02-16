import type { ReactNode } from 'react';

type Props = {
	children: ReactNode;
	title: string;
};

export function DemoWrapper({ children, title }: Props) {
	return (
		<div className="bg-gradient-1 not-content flex min-h-[450px] w-full flex-col items-center justify-center rounded-md p-[2em] text-center   text-white">
			<h2 className="min-h-[40px] text-center text-3xl text-white">{title}</h2>
			<div className="flex flex-1 items-center">{children}</div>
		</div>
	);
}
