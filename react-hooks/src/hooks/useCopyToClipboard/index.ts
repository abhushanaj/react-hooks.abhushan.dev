import React from 'react';

/**
 * useCopyToClipboard() - Custom react hook to copy any text content to the clipboard using the `navigator.clipboard.writeText` method.
 * @see - https://react-hooks.abhushan.dev/hooks/bom/usecopytoclipboard/
 */
export function useCopyToClipboard() {
	const [copiedInfo, setCopiedInfo] = React.useState<string | null>(null);

	const copyToClipboard = React.useCallback((textToCopy: string) => {
		async function copyText() {
			try {
				await navigator.clipboard.writeText(textToCopy);
				setCopiedInfo(textToCopy);
			} catch (error) {
				console.error('Error copying to clipboard', error);
				setCopiedInfo(null);
			}
		}

		void copyText();
	}, []);

	return [copiedInfo, copyToClipboard] as const;
}
