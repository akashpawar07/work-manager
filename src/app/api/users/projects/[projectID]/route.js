import projectModel from "@/models/projectModels";
import { NextResponse } from "next/server";
import { connect } from "@/dbConfig/database"

//database connection
connect()

// get single employee
export async function GET(request, { params }) {
    try {

        const { projectID } = params;
        // find employee by employeeId
        const singleProject = await projectModel.findById(projectID);
        console.log("Got the Individual project...", singleProject);

        if (!singleProject) {
            console.log("Project Not Found...")
            return NextResponse.json({
                message: "Project Not Found",
                success: false
            }, { status: 404 })
        }

        return NextResponse.json(singleProject, {
            message: "Got the Individual Project",
            success: true
        }, { status: 201 })

    } catch (error) {
        console.log("Failed to load Individual Project...", error.message);
        return NextResponse.json({
            message: "Failed to load Individual Project",
            success: false
        })
    }
}


// update the employe
export async function PUT(request, { params }) {

    const { projectID } = params
    const { projectName, description, submitionDate } = await request.json()

    try {

        const updateProject = await projectModel.findById(projectID)

            updateProject.projectName = projectName,
            updateProject.description = description,
            updateProject.submitionDate = submitionDate

        await updateProject.save()

        return NextResponse.json({
            message: "Project details updated successfully",
            success: true
        }, { status: 201 })

    } catch (error) {
        console.log("Failed to update project details....");
        return NextResponse.json({
            message: "Failed to update project details",
            success: false
        })
    }

}


// Delete the employee
export async function DELETE(request, { params }) {

    const { projectID } = params

    try {
        await projectModel.deleteOne({
            _id: projectID
        })

        console.log("Project deleted successfully....")
        return NextResponse.json({
            message: "Project Deleted Successfully",
            success: true
        }, { status: 201 })

    } catch (error) {
        console.log("Failed to deleted Project....", error.message)
        return NextResponse.json({
            message: "Failed to deleted Project",
            success: false
        })
    }

}