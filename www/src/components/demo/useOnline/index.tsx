import { useOnline } from '@abhushanaj/react-hooks';

function UseOnlineExample() {
	const isOnline = useOnline(true);

	return (
		<div>
			<p>Status is : {isOnline ? '🟢' : '🔴'}</p>
			<small>Try changing the network status from browser devtools settings or disconnect from internet</small>
		</div>
	);
}

export default UseOnlineExample;
