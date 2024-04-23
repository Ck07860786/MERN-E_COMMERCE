import mongoose from 'mongoose'

const productModel = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    slug:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:mongoose.ObjectId,
        ref:'category',
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    shipping:{
        type:Boolean,
    
    },
    image:{
        data:Buffer,
        contentType:String,

    }
},{timestamps:true})

export default mongoose.model('product',productModel)