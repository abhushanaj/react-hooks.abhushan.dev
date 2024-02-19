import { useNavigatorLanguage } from '@abhushanaj/react-hooks';

function UseNavigatorLanguageExample() {
	const preferredLanguage = useNavigatorLanguage('en-US');

	return (
		<div>
			<p>Preferred Language is : {preferredLanguage}</p>
			<time>Date in preferred language is {new Date(Date.now()).toLocaleDateString(preferredLanguage)}</time>
			<small className="block">
				Try changing the language settings from{' '}
				<a href="chrome://settings/languages" className="text-white">
					here
				</a>
			</small>
		</div>
	);
}

export default UseNavigatorLanguageExample;
