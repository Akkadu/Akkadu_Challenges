import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        reuired:true
    },
    name:{type:String,required:true}
})

const User = mongoose.model('user',userSchema)
export default User