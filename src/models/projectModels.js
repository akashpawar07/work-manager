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

const project = mongoose.models.Porjects || mongoose.model("Porjects", projectSchema)

export default project