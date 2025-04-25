"use client"
import React from 'react'
import Link from 'next/link'
import { useRef, useState } from 'react'

const Navbar = () => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const hamburgerRef = useRef()

    let handleClick = () => {
        if (isHamburgerOpen === true) {
            hamburgerRef.current.style.display = "none"
            setIsHamburgerOpen(false)
        }
        else if (isHamburgerOpen === false) {
            hamburgerRef.current.style.display = "block"
            setIsHamburgerOpen(true)
        }
    }



    return (
        <nav className='bg-[#ebebeb]'>
            <div className='flex md:justify-around items-center justify-between gap-1'>
                <div className="logo text-3xl font-bold cursor-default">
                    <Link href={"/"}>
                        <span className='text-red-600'>&lt;</span>
                        55lavkush555
                        <span className='text-red-600'>/&gt;</span>
                    </Link>
                </div>

                <div className='hidden md:block'>
                    <ul className='flex gap-3.5 text-2xl items-center'>
                        <li className='hover:text-red-500'><Link href={"/"}>Home</Link></li>
                        <li className='hover:text-red-500'><Link href={"/Blog"}>Blogs</Link></li>
                        <li className='hover:text-red-500'><Link href={"/Work"}>Work</Link></li>
                        <li className='hover:text-red-500'><Link href={"/Contact"}>Contact</Link></li>
                    </ul>
                </div>

                <div className="block md:hidden">
                    <button onClick={() => { handleClick() }} className='h-full flex items-center'><img src="/hamburger.svg" alt="hamberger" className='w-10' /></button>
                </div>
            </div>
            <div className="text-center text-2xl md:hidden hidden" ref={hamburgerRef}>
                <div className='mt-6 active:text-red-500'><Link onClick={() => { setIsHamburgerOpen(false); handleClick() }} href={"/"}>Home</Link></div>
                <div className='mt-6 active:text-red-500'><Link onClick={() => { setIsHamburgerOpen(false); handleClick() }} href={"/Blog"}>Blogs</Link></div>
                <div className='mt-6 active:text-red-500'><Link onClick={() => { setIsHamburgerOpen(false); handleClick() }} href={"/Work"}>Work</Link></div>
                <div className='mt-6 active:text-red-500'><Link onClick={() => { setIsHamburgerOpen(false); handleClick() }} href={"/Contact"}>Contact</Link></div>
            </div>
        </nav>
    )
}

export default Navbar
