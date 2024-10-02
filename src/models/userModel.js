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

const User = mongoose.models.Users || mongoose.model("Users", userSchema);
export default User;