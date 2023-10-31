"use client"
import React from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { AiOutlineMenu } from "react-icons/ai"
import Link from "next/link"


const Header = () => {

    const [menuIsOpen, setMenuIsOpen] = React.useState(false)
    const {status, data} = useSession()
    

    const handleLoginClick = () => signIn()

    const handleLogoutClick = () => {
        setMenuIsOpen(false)
        signOut() 
    }

    const handleMyTripsClick = () =>{
        
    }

    const handleMenuClick = () => setMenuIsOpen(!menuIsOpen)

    return (
        <div className="w-screen mx-auto p-5 py-0 h-[93px] flex justify-between items-center lg:border-b lg:border-grayLighter fixed top-0 bg-white z-30">
            <Link href={'/'}>
                <div className="relative h-[32px] w-[182px]">
                    <Image width={183} height={32} src={"/logo.png"} alt="Full Stack Week" />
                </div>
            </Link>

            {status === "unauthenticated" && (
                <button className="text-primary text-sm font-semibold mr-1" onClick={handleLoginClick}>Login</button>
            )}

            {status === "authenticated" && data.user && (
                <div className="flex items-center gap-3 border border-grayLighter p-2 px-3 rounded-full relative">
                    <AiOutlineMenu size={16} onClick={handleMenuClick} className="cursor-pointer"/>

                    <Image src={data.user.image!} width={35} height={35} alt={data.user.name!} className="rounded-full shadow-md"/>

                    {menuIsOpen && (
                        <div className="z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center">

                            <Link href="/my-trips" onClick={() => setMenuIsOpen(false)}>
                                <button className="pb-2 border-b border-grayLighter border-solid text-primary text-sm font-semibold cursor-pointer">
                                    Reservas
                                </button>
                            </Link>
                            
                            <button className="pt-2 text-primary text-sm font-semibold cursor-pointer" onClick={handleLogoutClick}>
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