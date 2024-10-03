// // dyanamics route

// import userModel from '@/models/userModel'
// import { NextResponse } from 'next/server'



// // delete a user by userid
// export async function DELETE(request, { params }) {

//     const { userId } = params
//     try {
//         await userModel.deleteOne({
//             _id: userId
//         })
//         console.log("user deleted")
//         return NextResponse.json({
//             message: "User has been deleted",
//             success: true
//         }, { status: 201, statusText: "user deleted" })

//     } catch (error) {
//         return NextResponse.json({
//             message: "Error while deleting the user",
//             success: false
//         })
//     }
// }

// // get a single user using userid || email also
// export async function GET(request, { params }) {
//     const { userId } = params
//     try {
//         const singleUser = await userModel.findById(userId).select("-password")
//         if (!singleUser) {
//             return NextResponse.json({
//                 message: "User does not exists with this Id",
//                 success: false
//             })
//         } else {
//             return NextResponse.json(singleUser)
//         }
//     } catch (error) {
//         return NextResponse.json({
//             message: "Unable to get Single user",
//             success: false
//         })
//     }

// }


// // Update the user by email
// export async function PUT(request, { params }) {
//     const { userId } = params
//     const { username, email } = await request.json();
//     try {

//         const user = await userModel.findById(userId)

//         user.username = username,
//         user.email = email

//         const updatedUser = await user.save()
//         return NextResponse.json(updatedUser)


//     } catch (error) {
//         return NextResponse.json({
//             message: "Unable to update user",
//             success: false
//         })
//     }

// }