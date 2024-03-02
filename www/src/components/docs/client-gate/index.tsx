import { useIsClient } from '@abhushanaj/react-hooks';

import type { PropsWithChildren } from 'react';

function ClientGate(props: PropsWithChildren) {
	const isClient = useIsClient();

	return isClient ? props.children : null;
}

export default ClientGate;
