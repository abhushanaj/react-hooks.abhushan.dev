import { forwardRef } from 'react';

import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'button'> & {
	variant?: 'primary' | 'secondary';
};

const Button = forwardRef<HTMLButtonElement, Props>(({ children, variant = 'primary', ...otherProps }, ref) => {
	const btnVariantsMap = {
		base: 'cursor-pointer font-medium disabled:cursor-not-allowed',
		primary: 'text-black rounded-md bg-white px-3 py-2 disabled:bg-white/30',
		secondary: 'text-white underline bg-transparent disabled:text-white/30'
	};
	return (
		<button ref={ref} className={`${btnVariantsMap['base']} ${btnVariantsMap[variant]} `} {...otherProps}>
			{children}
		</button>
	);
});

export default Button;
