"use client"
import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { AiOutlineMenu } from "react-icons/ai"


const Header = () => {

    const [menuIsOpen, setMenuIsOpen] = React.useState(false)
    const {status, data} = useSession()

    const handleLoginClick = () => signIn()

    const handleLogoutClick = () => {
        setMenuIsOpen(false)
        signOut() 
    }

    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

    return (
        <div className="container mx-auto p-5 py-0 h-[93px] flex justify-between items-center">
            <div className="relative h-[32px] w-[182px]">
                <Image width={183} height={32} src={"/logo.png"} alt="Full Stack Week" />
            </div>

            {status === "unauthenticated" && (
                <button className="text-primary text-sm font-semibold" onClick={handleLoginClick}>Login</button>
            )}

            {status === "authenticated" && data.user && (
                <div className="flex items-center gap-3 border border-grayLighter p-2 px-3 rounded-full relative">
                    <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer"/>

                    <Image src={data.user.image!} width={35} height={35} alt={data.user.name!} className="rounded-full shadow-md"/>

                    {menuIsOpen && (
                        <div className="z-50 absolute top-12 left-0 w-full h-full bg-white rounded-lg shadow-md flex flex-col justify-center items-center">
                            <button className="text-primary text-sm font-semibold cursor-pointer" onClick={handleLogoutClick}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
            
        </div>
    )
}

export default Header