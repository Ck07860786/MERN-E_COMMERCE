import express from "express";
import dotnev from 'dotenv'
import morgan from 'morgan'
import cors from 'cors'
import DbConnect from "./config/mongodb.js";
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
const app = express();

//env config
dotnev.config();

// db config
DbConnect();

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//rest  api
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)





//port listen 
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})