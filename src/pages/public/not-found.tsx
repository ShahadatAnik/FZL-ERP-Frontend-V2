import { firstRoute } from '@/routes';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

function V1() {
	return (
		<section className='flex items-center p-16'>
			<div className='container mx-auto my-8 flex flex-col items-center justify-center px-5'>
				<div className='max-w-md text-center'>
					<h2 className='mb-8 text-9xl font-extrabold text-red-600'>
						<span className='sr-only'>Error</span>404
					</h2>
					<p className='text-2xl font-semibold md:text-3xl'>
						Sorry, we couldn't find this page.
					</p>
					<p className='mb-8 mt-4'>
						But don't worry, you can find plenty of other things on
						our homepage.
					</p>
					<a
						href='/user'
						className='transform rounded-md bg-red-600 px-4 py-2 text-base font-semibold text-white transition duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus-visible:ring focus-visible:ring-red-500 focus-visible:ring-opacity-50'>
						Go back home
					</a>
				</div>
			</div>
		</section>
	);
}

function V3() {
	const navigate = useNavigate();
	return (
		<div className='flex h-screen flex-col items-center justify-center gap-12 py-8'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				viewBox='0 0 512 512'
				className='h-40 w-40 text-red-600'>
				<path
					fill='currentColor'
					d='M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z'></path>
				<rect
					width='176'
					height='32'
					x='168'
					y='320'
					fill='currentColor'></rect>
				<polygon
					fill='currentColor'
					points='210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042'></polygon>
				<polygon
					fill='currentColor'
					points='383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63'></polygon>
			</svg>
			<div className='flex flex-col items-center gap-4'>
				<h1 className='text-center text-3xl font-medium capitalize'>
					Not Found 404
				</h1>
				<p className='text-center text-xl'>
					Sorry, we can't find this page you are looking for.
				</p>
				<Button
					aria-label='Go Home'
					onClick={() => {
						if (firstRoute.path) {
							navigate(firstRoute?.path);
						} else {
							navigate('/login');
						}
					}}>
					Go Home
				</Button>
			</div>
		</div>
	);
}

export default function NotFound() {
	return <V3 />;
}
