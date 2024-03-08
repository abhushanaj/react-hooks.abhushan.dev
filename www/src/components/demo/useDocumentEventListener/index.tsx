import { useDocumentEventListener } from '@abhushanaj/react-hooks';

function UseDocumentEventListenerExample() {
	useDocumentEventListener(
		'click',
		() => {
			alert('Document Clicked');
		},
		{
			once: true
		}
	);

	return (
		<div className="flex flex-col gap-2">
			<small>Click anywhere on document to trigger an event (only once)</small>
		</div>
	);
}

export default UseDocumentEventListenerExample;
