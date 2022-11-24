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
    return ( 
        <nav className="w-full justify-between flex items-center text-white fixed top-0 left-0 right-0">
            <div className="mx-4 font-semibold text-lg">
                Scrow<span className="text-indigo-600">.</span>
            </div>
            <ul className="p-2 md:flex hidden list-none flex-row items-center flex-initial">
                {["Market" , "About Us" , "Contact"].map((item , index) => (
                    <NavbarItem key={item + index} title={item}/>
                ))}
                <li className="bg-[#7b3fe4] py-2 px-7 mx-4 rounded-full cursor-pointer hover:[#6433b9]">Connect Wallet</li>
            </ul>
        </nav>
     );
}

export default Navbar;