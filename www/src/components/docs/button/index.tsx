import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'>;

function Button({ children, ...otherProps }: Props) {
	return (
		<button className="text-blac cursor-pointer rounded-md bg-white px-3 py-2 font-medium" {...otherProps}>
			{children}
		</button>
	);
}

export default Button;
