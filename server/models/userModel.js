import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true,

    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true}
)

export default mongoose.model('user',userModel)