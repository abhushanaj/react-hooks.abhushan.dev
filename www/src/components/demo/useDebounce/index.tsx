import React from 'react';
import { useDebounce } from '@abhushanaj/react-hooks';

function UseDebounceExample() {
	const [scrollPercent, setScrollPercent] = React.useState('0%');

	const boxes = React.useMemo(() => new Array(100).fill(0), []);

	const containerRef = React.useRef<HTMLDivElement>(null);

	const [onScroll] = useDebounce(() => {
		if (containerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
			const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
			setScrollPercent(`${Math.round(percent)}%`);
		}
	}, 500);

	return (
		<div>
			<div className="my-3 flex flex-col gap-2">
				<div className="grid max-h-[300px] grid-cols-3 gap-4 overflow-auto" onScroll={onScroll} ref={containerRef}>
					{boxes.map((_, index) => (
						<div
							key={index}
							className="flex aspect-square w-[100px] items-center justify-center bg-green-500 text-lg font-bold text-white"
						>
							{index + 1}
						</div>
					))}
				</div>
			</div>

			<p>Scroll Percent: {scrollPercent}</p>
			<small>Scroll on the list of tems above and find the scroll percentage.</small>
		</div>
	);
}

export default UseDebounceExample;
