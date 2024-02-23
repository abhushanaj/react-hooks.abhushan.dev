import React from 'react';
import { useIsomorphicLayoutEffect } from '@abhushanaj/react-hooks';

function UseIsomorphicLayoutEffectExample() {
	const [boundingRect, setBoundingRect] = React.useState<DOMRect | null>(null);
	const boxRef = React.useRef<HTMLDivElement>(null);

	useIsomorphicLayoutEffect(() => {
		if (boxRef.current) {
			setBoundingRect(boxRef.current.getBoundingClientRect());
		}
	}, []);

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<div
				ref={boxRef}
				className="flex size-16 items-center justify-center rounded-md border-2 bg-green-500 text-white"
			>
				Box
			</div>

			<table className="border-collapse">
				<thead>
					<tr>
						<th className="border p-2">Width</th>
						<th className="border p-2">Height</th>
						<th className="border p-2">X Pos</th>
						<th className="border p-2">Y Pos</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border p-2">{boundingRect?.width || 0} px</td>
						<td className="border p-2">{boundingRect?.height || 0} px</td>
						<td className="border p-2">{Math.floor(boundingRect?.x || 0)} px</td>
						<td className="border p-2">{Math.floor(boundingRect?.y || 0)} px</td>
					</tr>
				</tbody>
			</table>

			<small className="block">Bounding box for the box element.</small>
		</div>
	);
}

export default UseIsomorphicLayoutEffectExample;
