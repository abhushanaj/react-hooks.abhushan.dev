import React from 'react';
import { useLockBodyScroll } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

function UseLockBodyScrollExample() {
	const [isLocked, setIsLocked] = React.useState(false);

	useLockBodyScroll(isLocked);

	return (
		<div>
			<p>Body Scroll is : {isLocked ? 'Locked' : 'Unlocked'}</p>
			<Button onClick={() => setIsLocked(!isLocked)}>{!isLocked ? 'Lock Scroll' : 'Unlock Scroll'}</Button>
		</div>
	);
}

export default UseLockBodyScrollExample;
