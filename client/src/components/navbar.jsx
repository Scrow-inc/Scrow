import { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavbarItem = ({ title, classProps }) => {
    return(
        <li className={`mx-5 cursor-pointer ${classProps}`}>
            <a href="#">{title}</a>
        </li>
    )
}

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return ( 
        <nav className="w-full px-4 justify-between flex items-center bg text-white fixed top-0 left-0 right-0 z-20">
            <div className="logo">
                scrow<span className="text-[#7b3fe4]">.</span>
            </div>
            <ul className="p-2 md:flex hidden ml-auto list-none flex-row items-center flex-initial">
                {["How to", "News" , "About Us"].map((item , index) => (
                    <NavbarItem key={item + index} title={item}/>
                ))}
                <li className="bg-[#7b3fe4] py-2 px-7 mx-4 rounded-full cursor-pointer hover:[#6433b9]">Connect Wallet</li>
            </ul>
            <div className="flex relative">
                { toggleMenu 
                    ? <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/> 
                    : <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>
                }
                {  toggleMenu && (
                    <ul
                        className="z-10 fixed top-0 -right-2 p-3 w-[60vw] h-screen shadow-2xl md:hidden list-none
                                    flex flex-col justify-start items-center rounded-md glassmorphism text-white animate-slide-in">
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose onClick={() => setToggleMenu(false)}/>
                        </li>
                        {["How to", "News" , "About Us"].map((item , index) => (
                    <NavbarItem key={item + index} title={item} classProps="my-4 text-3xl"/>
                ))}
                    </ul>
                )}
            </div>
        </nav>
     );
}

export default Navbar;