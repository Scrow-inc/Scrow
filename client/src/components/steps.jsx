import React from 'react';

const StepCard = ({ color, title, step, subtitle }) => (
	<div className='flex items-center w-full  glassmorphism p-7 m-2 hover:shadow-xl'>
		<div className={`w-10 h-10 rounded-full flex justify-center items-center text-white font-bold ${color}`}>
			{step}
		</div>
		<div className='ml-5 flex flex-col flex-1'>
			<h3 className='text-white text-lg'>{title}</h3>
			<p className='mt-1 text-white text-sm md:w-9/12'>{subtitle}</p>
		</div>
	</div>
);

const Steps = () => {
	return (
		<section
			id='how-to-use'
			className='flex flex-col md:flex-row w-full p-10 justify-center items-center gradient-bg-services'
		>
			<div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
				<div className='flex-1 flex flex-col justify-start items-start'>
					<h1 className='text-white text-3xl sm:text-5xl'>How to use</h1>
				</div>
			</div>
			<div className='flex flex-col justify-start items-center'>
				<StepCard
					color='bg-[#2952E3]'
					title='Connect Wallet'
					step='1'
					subtitle='Connect your Metamask wallet to the dApp'
				/>
				<StepCard
					color='bg-[#8945F8]'
					title='Sign Contract'
					step='2'
					subtitle='Set the price you want to lock in the escrow and set your agreement terms'
				/>
				<StepCard
					color='bg-[#F84550]'
					title='Generate Link'
					step='3'
					subtitle='A link to the agreement will be generated, copy and share with the third party'
				/>
				<StepCard
					color='bg-[red]'
					title='Release Funds'
					step='4'
					subtitle='When the agreement terms has been adhered to mark the transaction has completed and the funds will be released'
				/>
			</div>
		</section>
	);
};

export default Steps;
