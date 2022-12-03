import React, { useState } from 'react';
import Button from '../ui/Button';
import CreatecontractModal from './CreateContractModal';

const AppSection = () => {
	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}
	return (
		<div className='flex flex-col w-full min-h-screen p-10 gradient-bg-services '>
			<div className='mt-20 px-15 w-full flex  justify-between'>
				<div className=''></div>

				<Button title='Create New Contract' variant='primary' onClick={openModal} />
			</div>
			<div className=' w-full mt-10 flex items-center justify-center '>
				{/* <div className=' bg-white rounded-lg w-fit p-4'>
					<table className=' w-full'>
						<thead>
							<tr className='border-b'>
								<th className=' text-gray-600 px-3 py-4'>Contract id</th>
								<th className=' text-gray-600 px-3 py-4'>Amount</th>
								<th className=' text-gray-600 px-3 py-4'>Date Created</th>
								<th className=' text-gray-600 px-3 py-4'>Status</th>
								<th className=' text-gray-600 px-3 py-4'>Confirmation Status</th>
								<th className=' text-gray-600 px-3 py-4'>Is Signed</th>
								<th className=' text-gray-600 px-3 py-4'>Url</th>
								<th className=' text-gray-600 px-3 py-4'>Confirmation Code</th>
								<th className=' text-gray-600 px-3 py-4'></th>
							</tr>
						</thead>
					</table>
				</div> */}
			</div>
			<CreatecontractModal isOpen={isOpen} openModal={openModal} closeModal={closeModal} />
		</div>
	);
};

export default AppSection;
