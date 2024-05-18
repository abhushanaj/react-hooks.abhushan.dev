import React from 'react';
import { useDispatchCustomEvent, useSubscribeToCustomEvent } from '@abhushanaj/react-hooks';

import Button from '@/components/docs/button';

type CustomWindow = Window &
	typeof globalThis & {
		state: {
			value: number;
		};
	};

function ChildComponent() {
	const [windowValue, setWindowValue] = React.useState(0);

	const unSubscribe = useSubscribeToCustomEvent<{ newValue: number }>('valueChanged', (e) => {
		setWindowValue(e.detail.newValue);
	});

	return (
		<div>
			<p>window.state.value is :{JSON.stringify(windowValue)}</p>
			<Button variant="secondary" onClick={unSubscribe}>
				Unsubscribe
			</Button>
		</div>
	);
}

function UseSubscribeToCustomEventExample() {
	const dispatch = useDispatchCustomEvent('valueChanged');

	React.useEffect(() => {
		(window as CustomWindow).state = { value: 10 };
		dispatch({ newValue: 0 });

		(window as CustomWindow).state = new Proxy((window as CustomWindow).state, {
			set(obj, prop, value) {
				if (prop === 'value') {
					dispatch({ newValue: value });
				}

				// @ts-expect-error
				obj[prop] = value;

				return true;
			}
		});
	}, []);

	const updateWindowValue = (newValue: number) => {
		(window as CustomWindow).state.value = newValue;
	};

	return (
		<div className="flex flex-col gap-2">
			<ChildComponent />
			<Button variant="secondary" onClick={() => updateWindowValue(20)}>
				Set window.state.value=20
			</Button>
			<Button variant="secondary" onClick={() => updateWindowValue(30)}>
				Set window.state.value=30
			</Button>

			<small>Update the window.state.value from console and see it reflect above.</small>
			<small>
				The example above is simply creating a proxy over window.state and for every set action performed on it,
				dispatching action which the component is subscribing to.
			</small>
		</div>
	);
}

export default UseSubscribeToCustomEventExample;
