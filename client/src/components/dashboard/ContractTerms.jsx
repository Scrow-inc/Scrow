import React from 'react';
import Button from '../ui/Button';

export function ContractTerms({ nextStep }) {
	return (
		<div className='h-full px-1 pr-2 md:px-0 max-h-[550px] md:h-full md:max-h-[520px] overflow-y-scroll md:overflow-hidden'>
			<h5 className='text-[20px] leading-[30px] text-[#F84550]'>Warning!</h5>
			<div className='mt-2'>
				<p className=' text-gray-300'>
					Creating a contract agreement is going to automatically{' '}
					<span className='text-white'>lock funds</span> in escrow which attracts a service fee of{' '}
					<span className='text-white'>0.8%.</span> The amount will be deducted from your wallet after creating a contract.
				</p>
			</div>
			<h5 className='text-[20px] leading-[30px] text-white mt-4'>Terms & Conditions</h5>
			<p className='text-gray-300 text-sm leading-[21px] mt-2'>
				By using this website to create contract on the Polygon blockchain, you accept that you are interacting
				with a smart contract that this website has no control over. The operators of this website accept no
				liability whatsoever in relation to your use of these smart contracts. By using this website to make a
				contract, you also have read and agreed to the{' '}
				<a href={'/terms'} className='text-main'>
					Terms and Conditions
				</a>
				.
			</p>

			<div className='flex justify-center flex-col  w-full my-8'>
				<Button title={'Continue'} variant={'primary'} onClick={nextStep} />
			</div>
		</div>
	);
}
