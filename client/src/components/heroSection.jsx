import {React} from 'react';


const Hero = ({ connectWallet}) => {
	
	return (
		<div className='flex flex-col items-center justify-center w-full min-h-screen px-2 mx-auto text-white purple-gradient'>
			<h1 className='text-4xl font-bold text-center md:text-6xl'>
				Secure Payments <br /> Without <span className='text-main'>Chargeback risks</span>
			</h1>
			<p className='w-full my-2 text-center md:w-96'>
				Use smart contracts to carry out secure transactions using our easy-to-use escrow service. We’ll take
				care of the rest.
			</p>

			<div className='flex items-center justify-center gap-2 my-4'>
				<button 
        onClick={connectWallet}
        className='py-2 px-7 font-semibold bg-[#7b3fe4] rounded-full'>GET STARTED</button>
			</div>
		</div>
	);
};

export default Hero;
