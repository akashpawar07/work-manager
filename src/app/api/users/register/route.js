import { connect } from '@/dbConfig/database';
import User from '@/models/userModel.js'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'



//database connection
connect()

export async function POST(request) {
    try {
        // get data from body of frontend
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        //checking what is comming in request body
        console.log(reqBody);

        //if all fields are empty
        if (!username || !email || !password) {
            console.log("All fields are requied")
            return NextResponse.json({ success: false, message: "All fields are required" })
        }

        // check user already exists
        const isUserExist = await User.findOne({ email })
        if (isUserExist) {
            console.log("user already exists....")
            return NextResponse.json({ success: false, message: "Sorry! User already exists" })
        }

        // hash the password and create user to the database
        const hashedPassword = await bcrypt.hash(password, 12);
        const createUser = await User.create({
            username,
            email,
            password : hashedPassword
        })

        const userData = await createUser.save()
        console.log("User Signup Successfully...", userData)

        return NextResponse.json({
            success: true,
            message: "User Signup Successfully"
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}


