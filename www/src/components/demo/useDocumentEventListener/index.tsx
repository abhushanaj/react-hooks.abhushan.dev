import { useDocumentEventListener } from '@abhushanaj/react-hooks';

function UseDocumentEventListenerExample() {
	useDocumentEventListener('click', () => {
		alert('Document Clicked');
	});

	return (
		<div className="flex flex-col gap-2">
			<small>Click anywhere on document to trigger an event</small>
		</div>
	);
}

export default UseDocumentEventListenerExample;
