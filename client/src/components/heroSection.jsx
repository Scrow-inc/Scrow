const Hero = () => {
    return ( 
        <div className="min-h-screen text-white flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold">
                Decentralized Escrow
            </h1>
            <p className="w-96 my-2 text-center">
                Use smart contracts to carry out secure transactions using our easy-to-use escrow service. We’ll take care of the rest.
            </p>
            <div className="my-4 flex justify-center items-center gap-2">
                <button className="py-2 px-7 font-semibold bg-[#7b3fe4] rounded-full">
                    GET STARTED
                </button>
                <button className="py-2 px-7 font-semibold bg-[white] rounded-full text-indigo-600">
                    LEARN MORE
                </button>
            </div>
        </div>
     );
}
 
export default Hero;