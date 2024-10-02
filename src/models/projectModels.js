import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName:{
        type : String,
        required : true,
        unique : false
    },
    description:{
        type : String
    },
    submitionDate:{
        type : String
    }
})

const project = mongoose.models.userPorject || mongoose.model("userPorject", projectSchema)

export default project