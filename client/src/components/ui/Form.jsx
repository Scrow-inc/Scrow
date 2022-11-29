import React from 'react';

export const TextInput = ({ label, name, type, marker, ...rest }) => {
	return (
		<div className='relative my-4'>
			<label className='text-gray-700 dark:text-gray-200' htmlFor={name}>
				{label}
			</label>
			{marker && (
				<div className='absolute inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none'>
					{marker}
				</div>
			)}
			<input
				type={type}
				name={name}
				className={`block ${
					marker && 'pl-10 pr-4'
				} w-full px-4 p-2.5 mt-2 text-gray-300 bg-primary border border-gray-600 rounded-md focus:outline-none focus:ring-[1px] focus:ring-main`}
				{...rest}
			/>
		</div>
	);
};

export const TextInputArea = ({...rest}) => {
	return (
		<div>
			<label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
				Contract Details
			</label>
			<textarea
				id='message'
				rows='8'
				className='block p-2.5 w-full text-sm text-gray-300 bg-primary border border-gray-600 rounded-md focus:outline-none focus:ring-[1px] focus:ring-main'
				placeholder='Write your agreements here...'
				{...rest}
			></textarea>
		</div>
	);
};
