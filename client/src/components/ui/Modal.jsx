import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { RiArrowLeftLine, RiCloseFill } from 'react-icons/ri';
import { Fragment } from 'react';

export default function Modal({ isOpen, closeModal, step, prevStep, children }) {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as='div'
				className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full bg-primary bg-opacity-50 backdrop-blur-lg backdrop-filter  md:inset-0 h-full md:h-full md:max-h-fit flex justify-center items-center'
				onClose={closeModal}
			>
				<div className='relative p-4 w-full max-w-2xl h-full'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<Dialog.Panel className='relative bg-primary transform shadow-xl transition-all border-2 border-[#7b3fe4] rounded-[10px] p-4'>
							<div className='flex items-center justify-between p-1 md:p-2'>
								{/* Start of action button */}
								<div>
									{step !== 0 && (
										<button className='text-[20px] text-main' onClick={prevStep}>
											<RiArrowLeftLine />
											{/* back button */}
										</button>
									)}
								</div>
								<div>
									<button
										className='text-[20px] text-white hover:text-theme-100 border border-white rounded-md m-6 transition-all hover:rounded-full'
										onClick={closeModal}
									>
										<RiCloseFill /> {/* close button */}
									</button>
								</div>
							</div>
							{/* End of action button */}
							<div className='lg:p-2'>{children}</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
}
