import mongoose from 'mongoose'

const screenshotSchema = new mongoose.Schema({
    image :{
       type: Buffer,
    },
    fileName:{
        type : String
    }
   
})

const Screenshot = mongoose.models.screenshots || mongoose.model("screenshots", screenshotSchema);
export default Screenshot;