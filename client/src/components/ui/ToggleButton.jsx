import React from 'react';
import { Switch } from '@headlessui/react';

export default function ToggleNutton({ label, enabled, setEnabled }) {
	return (
		<label className='relative inline-flex items-center cursor-pointer'>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${
					enabled ? 'bg-main max-w-[45px] border-main' : 'bg-primary border border-gray-600 max-w-[50px]'
				}
          relative inline-flex h-[20px] w-[35px] shrink-0 cursor-pointer rounded-full border-2 border-gray-600 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				{/* <span className='sr-only'>Use setting</span> */}
				<span
					aria-hidden='true'
					className={`${enabled ? 'translate-x-[0.8rem]' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[16px] mx-[1px] transform rounded-full ${
				enabled ? 'bg-white' : 'bg-gray-200'
			} shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
			<span className='ml-3 text-sm font-medium text-gray-200'>{label}</span>
		</label>
	);
}
