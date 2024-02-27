import { useOuterWindowSize } from '@abhushanaj/react-hooks';

function UseOuterWindowSizeExample() {
	const { width, height } = useOuterWindowSize();

	return (
		<div className="flex flex-col items-center justify-center gap-4">
			<table className="border-collapse">
				<thead>
					<tr>
						<th className="border p-4">Width</th>
						<th className="border p-4">Height</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="border p-4">{width || 0} px</td>
						<td className="border p-4">{height || 0} px</td>
					</tr>
				</tbody>
			</table>

			<small className="block">Resize your wndow screen to see changes in outer window dimenions.</small>
		</div>
	);
}

export default UseOuterWindowSizeExample;
