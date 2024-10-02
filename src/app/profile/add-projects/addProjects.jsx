"use client"
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function addEmployee() {


  const router = useRouter()
  const [formData, setFormData] = React.useState({
    projectName: "",
    description: "",
    submitionDate: ""
  })

  // console.log(formData)

  // this function will clear all fields
  const handleReset = async () => {



    setFormData({
      projectName: "",
      description: "",
      submitionDate: ""
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      //check empty fields
      if (!formData.projectName || !formData.description, !formData.submitionDate) {
        toast.warning("All fields are mandatory", { theme: "colored" });
        return;
      }

      // make post request 
      const response = await axios.post("/api/users/projects", formData)

      if (response.data.success === true) {
        console.log("Project Created Successfully...", response)
        toast.success("Project Created Successfully")

        setFormData({
          projectName: "",
          description: "",
          submitionDate: ""
        })

      }
      if (response.data.success === false) {
        toast.error("Project already exists")
        console.log("Project already exists...", response)
        setFormData({
          projectName: "",
          description: "",
          submitionDate: ""
        })
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <>
      <ToastContainer theme='colored' />

      <div className='w-full md:w-[96vw] md:h-auto px-4 pt-4 flex items-center justify-center '>
        <div className='p-4 md:w-[60%] md:h-auto flex flex-col gap-4 '>
          <h1 className='text-2xl text-green-600 font-bold '>Add new project</h1>
          <form action="" onSubmit={handleSubmit} className='flex flex-col gap-2'>

            <div>
              <label htmlFor="projectName" className='block my-1'>Project Name</label>
              <input
                className='bg-gray-700 w-full p-2 rounded-md'
                type="text"
                name="projectName"
                value={formData.projectName}
                placeholder='Please enter project name'
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                id=""
              />
            </div>
            <div className='mt-4'>
              <label htmlFor="description" className='block my-1'>Description</label>
              <textarea
                className='bg-gray-700 w-full p-2 rounded-md'
                rows={5}
                name="description"
                value={formData.description}
                placeholder='project description...'
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                id=""
              />
            </div>
            <div>
              <label htmlFor="submitionDate" className='block my-1'>Submition Date</label>
              <input
                className='bg-gray-700 w-full p-2 rounded-md'
                type="date"
                name="submitionDate"
                value={formData.submitionDate}
                onChange={(e) => setFormData({ ...formData, submitionDate: e.target.value })}
                id="" />
            </div>

            <div className='flex gap-4 mt-7 md:mt-4 justify-center md:justify-start'>
              <button type='submit' className='p-2 bg-blue-700 rounded-md'>Create Project</button>
              <button type='reset' onClick={handleReset} className='px-4 bg-red-700 rounded-md'>Reset</button>
            </div>
            <div className='mt-8'>
              <span>Note :</span> <span className='text-gray-500'> Upon project creation, our system initiates automated screenshot capture every 5 minutes, providing a comprehensive visual record of progress. To access these screenshots, simply navigate to the Profile tab and click on 'Screenshots.</span>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default addEmployee
