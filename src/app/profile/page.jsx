import React from 'react'
import Image from 'next/image'

export const metadata = {
    title: "Work Manager | Home"
}

function page() {
    return (
        <>

            <div className='w-full md:w-full md:h-auto md:p-2 flex flex-col'>
                <div className='px-3 w-full '>
                    <h1 className='text-xl my-4 ml-14 animate-bounce text-green-600'>Welcome !</h1>
                </div>

                <div className='flex flex-col md:flex-row md:w-full md:h-auto p-2 '>
                    <div className='md:w-[55%] w-full'>
                        <Image src={"/Iamge.svg"} width={500} height={500}></Image>
                    </div>

                    <div className='w-full mt-2 md:w-[45%] p-2 flex flex-col md:items-start md:justify-center '>
                        <h1 className='text-xl font-bold'>Overview</h1>
                        <p className='mt-4'>
                        Welcome to our work manager! Here, you can explore and showcase your projects effortlessly through three main pages: "Add New Project," "My Projects," and "Screenshots. <br /><br /> The "Add New Project" feature allows you to easily create and share your latest works, while the "My Projects" page serves you your all current projects. Additionally, our innovative screenshot functionality automatically captures your projects every 5 minutes, providing a real-time glimpse into your evolving work. Join us in crafting and sharing your creative journey seamlessly.
                        </p>

                    </div>
                </div>
            </div>

        </>
    )
}

export default page

