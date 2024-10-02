
import ScreenshotModel from "@/models/screenshotsModel"
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Establish database connection
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.log("Failed to connect to MongoDB", error.message));


export async function GET(request) {
    try {

        const allImages = await ScreenshotModel.find().exec();

        return NextResponse.json(allImages, {
            message: "Got the images",
            success: true
        }, { status: 201 })

    } catch (error) {
        console.log("failed to laod images...", error.message)
        return NextResponse.json({
            message: "Failed to get the images",
            success: false
        }, { status: 500 })
    }
}