import { useCopyToClipboard } from '@abhushanaj/react-hooks';
import { Check, Copy } from 'lucide-react';

function UseCopyToClipboardExample() {
	const [copiedText, copyToClipboard] = useCopyToClipboard();

	const message = 'I love react!';

	return (
		<div>
			<div className="flex items-center justify-center gap-5">
				<h2>{message}</h2>
				<button
					className="flex size-7 cursor-pointer items-center justify-center rounded-md"
					onClick={() => {
						copyToClipboard(message);
					}}
				>
					{copiedText === null ? <Copy /> : <Check />}
				</button>
			</div>
		</div>
	);
}

export default UseCopyToClipboardExample;
