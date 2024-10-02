import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username :{
       type: String,
       trim : true,
       required : [true, "Please provide a username"]
    },
    email :{
        type : String,
        trim : true,
        required : [true, "Please provide a eamil"]
    },
    password :{
        type : String,
        trim : true,
        required : [true, "Please provide a password"]
    }
})

const User = mongoose.models.clients || mongoose.model("clients", userSchema);
export default User;