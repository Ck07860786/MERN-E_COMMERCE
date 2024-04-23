import mongoose from 'mongoose'
const DbConnect = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL)
        console.log(`database Connected ${connect.connection.host}`)

        
    } catch (error) {

        console.log(error)
        
    }
}

export default DbConnect;