"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginPage() {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            if (!user.email || !user.password) {
                toast.warning("All fields are mandatory",{theme : "colored"});
                return;
            }

            const response = await axios.post("/api/users/login", user);
            if (response.data.success === true) {
                router.push('/profile');
                console.log("Login successful...", response);
                toast.success("Login Successful",{theme : "colored"})
                return;
            }
            if (response.data.success === false) {
                router.push('/login');
                console.log("User does not exists", response)
                toast.error("User does not exists",{theme : "colored"})
                return;

            }if (response.data.errCode === 'pass') {
                toast.warning("Invalid Password",{theme : "colored"})
                console.log("Invalid password....")
                return;

            } else {
                console.log("Failed to Login....", response.error)
                toast.error("Failed to Login",{theme : "colored"})
                return;
            }

            

        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };




    return (
        <>
            <ToastContainer position="top-right"/>
            <div className='h-[90vh] w-screen md:w-[100%] md:h-[90vh] flex justify-center items-center '>
               
                <div className='w-full h-[70vh] md:w-[35%] md:h-[60vh] md:mt-[5%] flex flex-col justify-center md:bg-[#191732] rounded-md'>
                    
                    <h1 className='text-3xl text-center text-blue-600
                    -200 font-bold m-5 md:mb-8'>{loading ? "processing..." : "Login"}</h1>
                    <p className="text-center">Use registered email as your username</p>
                    <form action=""
                    className='  text-white gap-4 py-4 md:bg-[#191732]
                    flex flex-col items-center justify-center rounded-lg'
                    >
                        <div className='w-[99%]  h-[100px] gap-2 flex flex-col justify-center items-center '>

                            <div className=' w-[80%]'>
                                <label htmlFor="email" className=''>username</label>
                            </div>
                            <div className=' w-[80%]'>
                                <input
                                    className='py-2 px-2 w-[99%] text-slate-950 font-bold rounded-md'
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    placeholder='Enter your username'

                                />

                            </div>

                        </div>

                        <div className='w-[99%] h-[100px] gap-2 flex flex-col justify-center items-center'>

                            <div className='w-[80%]'>
                                <label htmlFor="password" className=' font-thin'>password</label>
                            </div>
                            <div className='w-[80%] text-slate-900'>
                                <input
                                    className='py-2 px-2 w-[99%] text-slate-950 font-bold rounded-md'
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    placeholder='password'
                                />
                            </div>

                        </div>

                        <button
                            onClick={handleLogin}
                            className='bg-gray-700 px-4 py-2 w-[78%] rounded-md font-extrabold mt-5'
                            type='submit'
                        >Login
                        </button>
                        <div className="text-[18px]">
                            <span>dont have an account </span><Link href='/register' className="text-blue-600 font-extrabold">Signup</Link>
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}