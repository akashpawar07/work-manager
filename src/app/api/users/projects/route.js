import { NextResponse } from "next/server";
import projectModels from "@/models/projectModels"
import { connect } from "@/dbConfig/database"

//database
connect()

// Create Project
export async function POST(request) {

    try {

        // get body data in json formate
        const { projectName, description, submitionDate } = await request.json()

        //all fields are empty
        if (!projectName || !description || !submitionDate) {
            console.log("All fields are requied")
            return NextResponse.json({message: "All fields are required", success : false})
        }

        // check is Project is already exists or not
        const isProjectExist = await projectModels.findOne({ projectName })
        if (isProjectExist) {
            console.log("project already exists....")
            return NextResponse.json({ message: "Project already exists", success: false })
        }

        // create Project 
        const project = await projectModels.create({
            projectName,
            description,
            submitionDate
        })

        //save Project to database
        const createdProject = await project.save();
        console.log("Project Created successfully...", createdProject);

        //send response at client-side
        return NextResponse.json(
            { message: "Project Created Successfully", success: true },
            { status: 201 }
        )

    } catch (error) {
        console.log("Error while creating Project...", error.message)
        return NextResponse.json({
            message: "falid to create Project",
            success: false
        }, { status: 500 })
    }

}

// get all Project from projects table present in database
export async function GET(request) {

    const allProject = [];
    try {

        const allProject = await projectModels.find();

        return NextResponse.json(allProject, {
            message: "Got the all Project ",
            success: true
        }, { status: 201 })

    } catch (error) {
        console.log("Failed to load Project.... ", error.message)
        return NextResponse.json({
            message: "Failed to load Project",
            success: false
        })
    }
}
