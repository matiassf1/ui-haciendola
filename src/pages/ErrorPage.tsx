import { useNavigate } from 'react-router-dom';

export const ErorrPage = () => {
	const navigate = useNavigate();
	return (
		<div className="min-h-screen flex flex-grow items-center justify-center bg-gray-900">
			<div className="rounded-lg bg-gray-700 p-8 text-center shadow-xl">
				<h1 className="mb-4 text-4xl font-bold">ERROR 404</h1>
				<p className="text-white">
					Oops! The page you are looking for could not be found.
				</p>
				<button
					onClick={() => {
						navigate('/');
					}}
					className="mt-4 inline-block rounded bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-600"
				>
					{' '}
					Go back to Home{' '}
				</button>
			</div>
		</div>
	);
};
