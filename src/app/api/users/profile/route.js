import userModel from '@/models/userModel'
import { NextResponse } from 'next/server'


// get all users are present in the database and show to client
export async function GET(request) {
    const allUsers = []
    try {
        const allUsers = await userModel.find().select("-password")
        return NextResponse.json(allUsers)

    } catch (error) {

        console.log("failed to load users")
        return NextResponse.json({
            message: "failed to laod users",
            success: false
        })
    }
}

