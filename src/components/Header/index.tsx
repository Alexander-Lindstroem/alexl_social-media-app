'use client'
import Link from "next/link"
import AccountLinks from "../AccountLinks"
import Logo from "../Logo"
import SearchInput from "../SearchInput/indext"
import MobileMenu from "../MobileMenu"
import { useEffect, useState } from "react"

const Header = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    
    useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 90);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
    }, []);    

    
    return (
        <header 
            className={`fixed z-10 bg-white w-full h-fit flex flex-col items-center md:flex-row md:items-center md:justify-between p-4 
            shadow-xl`}>
            <div className={`transition-all duration-400 ease-out ${isScrolled ? "p-0 md:p-10" : "p-10 md:p-10"}`}>
                <Logo 
                    className={`
                        absolute origin-top bg-gradient-to-b from-red-500 to-rose-500 
                        text-white p-4 font-bold rounded-2xl text-2xl md:text-4xl px-8 
                        cursor-pointer transition-all ease-out duration-400 top-0 right-1/2 
                        translate-x-1/2 md:right-[100%] md:translate-x-[110%] md:origin-left 
                        ${isScrolled
                        ? "translate-y-[-100%] md:scale-100 md:translate-y-3/10" 
                        : "translate-y-3/10"}`}/>
            </div>
            <div className="flex gap-2 justify-between items-center md:absolute md:right-1/2 md:translate-x-1/2">
                <SearchInput/>
                <MobileMenu/>
            </div>
            <div className="hidden md:flex gap-2 items-center">
                <AccountLinks/>
            </div>
        </header>
    )
}

export default Header