import React from 'react';

const Hero = () => {
	return (
		<div className='w-full min-h-screen purple-gradient text-white flex flex-col justify-center items-center px-2 mx-auto'>
			<h1 className='text-4xl md:text-6xl font-bold text-center'>Decentralized Escrow</h1>
			<p className='w-full md:w-96 my-2 text-center'>
				Use smart contracts to carry out secure transactions using our easy-to-use escrow service. We’ll take
				care of the rest.
			</p>
			<div className='my-4 flex justify-center items-center gap-2'>
				<button className='py-2 px-7 font-semibold bg-[#7b3fe4] rounded-full'>GET STARTED</button>
				{/* <button className="py-2 px-7 font-semibold bg-[white] rounded-full text-indigo-600">
                    LEARN MORE
                </button> */}
			</div>
		</div>
	);
};

export default Hero;
