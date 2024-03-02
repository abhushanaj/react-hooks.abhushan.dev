import React from 'react';
import { useOnMount } from '@abhushanaj/react-hooks';

import type { PropsWithChildren } from 'react';

function ClientGate(props: PropsWithChildren) {
	const [isClient, setIsClient] = React.useState(false);

	useOnMount(() => {
		setIsClient(true);
	});

	return isClient ? props.children : null;
}

export default ClientGate;
