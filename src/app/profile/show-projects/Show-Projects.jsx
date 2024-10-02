"use client"
import React from "react"
import axios from "axios"
import { useEffect, useState } from "react"


export default function ShowProjects() {

  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get("/api/users/projects")
        console.log("fetching data : ", response.data)
        setData(response.data)

      } catch (error) {
        console.log(error.message)
      }
    }

    fetchData()

  }, [])


  return (
    <>

      <h1 className="text-center font-bold text-3xl text-green-500 my-4 text-shadow-md text-shadow-gray-500 ">My Projects</h1>

      <div
        className="w-full md:w-[96vw] md:h-[75vh] gap-4  overflow-y-auto no-scrollbar md:p-2 flex flex-col items-center"
      >

        <div className="flex flex-col gap-2 p-1 justify-center items-center w-full md:w-[70%] ">

          {
            data.map((allProject) => {

              const { projectName, description, submitionDate } = allProject

              return (
                <div key={projectName} className="p-2 w-full flex flex-col gap-3 overflow-y-auto no-scrollbar h-auto rounded-md dark:text-white text-white bg-[#2d2c2d]">
                  <div className="flex flex-col md:flex-row p-2 gap-6 justify-between">
                    <div className="w-full md:w-[20%] text-center border-b-2 md:border-none p-2 md:p-0">{projectName}</div>
                    <div className="w-full md:w-[80%]">
                      {description}</div>
                  </div>
                  <div className="flex px-2 w-full">
                    <span className="ml-auto text-gray-500 italic text-[15px] ">submission date : {submitionDate}</span>
                  </div>
                </div>
              );
            })
          }


        </div>

      </div>
    </>
  )
}


