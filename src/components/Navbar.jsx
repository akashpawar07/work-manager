"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import TimerContainer from '@/components/TimerContainer'



//icons 
import { IoMdAddCircle } from "react-icons/io";
import { FaListUl } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { RiScreenshot2Fill } from "react-icons/ri";



export default function Navbar() {
    const [openProfile, setOpenProfile] = useState(false)

    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axios.post("/api/users/logout")

            if (response.data.success === true) {
                router.push('/');
                console.log("Logout successful...", response);
                toast.success("Logout Successful", { theme: "colored" })
                return;
            }

        } catch (error) {
            console.log("An error occurred : ", error.message)
        }
    }



    return (
        <>
            <ToastContainer theme='colored' />
            <nav
                className="flex px-6 md:flex-row h-[70px] items-center justify-between bg-blue-700 md:px-20"
            >
                <div>
                    <h1 className='text-2xl text-white'>Work Manager</h1>
                </div>

                <div>
                    <button
                        className='flex items-center gap-2 text-xl text-white '
                        onClick={() => openProfile ? setOpenProfile(false) : setOpenProfile(true)}
                    > <RiAdminFill />Pofile </button>
                </div>
            </nav>

            {openProfile &&
                <div className='absolute right-0 justify-evenly p-4 md:p-2 flex flex-col items-center
                 text-slate-900 bg-[#ffffff] right-100 z-[100] w-full md:h-[80vh] md:w-[22%] gap-12 shadow-md shadow-[#df7272] '
                >
                    <div className='flex p-4 rounded-full w-[95%] md:w-[99%] items-center justify-center shadow-inner shadow-[#141313] bg-[#232223a4] text-white cursor-not-allowed border-slate-900'>
                        <h1 className='mr-2 font-bold'>Welcome Back ❤️</h1>
                    </div>

                    <ul className='flex flex-col px-4 gap-6 w-[99%] text-slate-900'>

                        <Link href='/profile' onClick={() => setOpenProfile(false)} className='flex items-center gap-2 p-2 shadow-md shadow-[#363535] hover:bg-gray-700 hover:text-white cursor-pointer'> <span><FaHome /></span> Go Home</Link>

                        <Link href='/profile/show-projects' onClick={() => setOpenProfile(false)} className='flex items-center gap-2  p-2 shadow-md shadow-[#363535] hover:bg-gray-700 hover:text-white cursor-pointer'> <span><FaListUl /></span> My Projects</Link>

                        <Link href='/profile/add-projects' onClick={() => setOpenProfile(false)} className='flex items-center gap-2 p-2 shadow-md shadow-[#363535] hover:bg-gray-700 hover:text-white cursor-pointer'><span><IoMdAddCircle /></span>Add New Project</Link>

                        <Link href='/profile/screenshots' onClick={() => setOpenProfile(false)} className='flex items-center gap-2 p-2 shadow-md shadow-[#363535] hover:bg-gray-700 hover:text-white cursor-pointer'><span><RiScreenshot2Fill /></span>Screenshots</Link>

                    </ul>
                    <div className='flex items-start w-[80 %]'>
                        <button
                            onClick={handleLogout}
                            type='submit' className='bg-red-700 hover:bg-red-600 text-purple-50 px-3 py-1 rounded-sm'
                        >Logout</button>
                    </div>
                </div>
            }
        </>
    )
}
