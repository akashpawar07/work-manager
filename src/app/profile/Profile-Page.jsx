"use client"
import React from "react"
import axios from "axios"
import Image from "next/image"
import { useState, useEffect } from "react"
import TimerContainer from '@/components/TimerContainer'



function Page() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get("/api/users/projects")
                console.log("fetching data : ", response.data)
                setProjects(response.data)

            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData()

    }, [])


    return (
        <>

            <div className="w-full md:w-full md:h-auto md:p-2 flex flex-col">
                <div className="px-3 w-full ">
                    <h1 className="text-xl my-4 ml-14 animate-bounce text-green-600">Welcome !</h1>
                </div>

                <div className="flex flex-col md:flex-row md:w-full md:h-auto p-2 ">
                    <div className="md:w-[55%] w-full">
                        <Image src={"/Iamge.svg"} width={500} height={500} alt="logo"></Image>
                    </div>

                    <div className="w-full mt-2 md:w-[45%] p-2 flex flex-col md:items-start md:justify-center ">
                        <h1 className="text-xl font-bold">Overview</h1>
                        <p className="mt-4">
                            Welcome to our work manager! Here, you can explore and showcase your projects effortlessly through three main pages: "Add New Project," "My Projects," and "Screenshots. <br /><br /> The "Add New Project" feature allows you to easily create and share your latest works, while the "My Projects" page serves you your all current projects. Additionally, our innovative screenshot functionality automatically captures your projects every 5 minutes, providing a real-time glimpse into your evolving work. Join us in crafting and sharing your creative journey seamlessly.
                        </p>

                    </div>
                </div>

                <h1 className="text-center text-3xl font-bold mt-10">Time Activity</h1>

                <div className=" p-2 gap-4 flex flex-col">
                    {projects.map((allProjects, index) => {
                        const { projectName, _id } = allProjects

                        return (
                            <div key={projectName}>
                                <TimerContainer projectId={_id} projectName={projectName} />
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Page

