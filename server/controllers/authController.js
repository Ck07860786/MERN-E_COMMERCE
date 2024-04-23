import JWT from 'jsonwebtoken'
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";

 export const registerController= async(req,res)=>{

    try {
        const {name,email,phone,password,answer} = req.body

        //validations 
        if(!name){
            return res.send({
                message:'name is required'
            })
        }

        if(!email){
            return res.send({
                message:'email is required'
            })
        }

        if(!phone){
            return res.send({
                message:'Phone no is required'
            })
        }

        if(!password){
            return res.send({
                message:'password is required'
            })
        }
        if(!answer){
            return res.send({
                message:'Answer is required'
            })
        }

        //checking user 
        const existingUser = await userModel.findOne({email})

      //existing user
      if(existingUser){
        return res.status(200).send({
            success:false,
            message:'user already exist',
            
        })
      }

      //register user
      const hashedPassword = await hashPassword(password) 

      //save
      const user = await new userModel({name,email,phone,answer, password:hashedPassword}).save()

      res.status(201).send({
        success:true,
        message:'user registered successfully',
        user,
      })

    } catch (error) {
     

        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in registration',
            error,
        })

        
    }

}

//login 

export const loginController =async(req,res)=>{


    try {
        const {email,password}= req.body
        
        
        if(!email || !password){
            return res.send({
                success:false,
                message:'incorrect email or password'
            })
        }

        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email not register'
            })
        }

        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:'invalid password'
            })
        }
        
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRETKEY,{
            expiresIn:"1d"
        })

        res.status(200).send({
            success:true,
            message:'Login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                role:user.role,
            },
            token
            
         })
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in login',
            error,
        })
        
    }
}

//forget pasword

export const forgotPasswordController= async(req,res)=>{

    try {

        const {email,newPassword,answer} = req.body

        if(!email){
            res.status(400).send({
                message:'Email is required'
            })
        }
        if(!newPassword){
            res.status(400).send({
                message:'Password is required'
            })
        }
        if(!answer){
            res.status(400).send({
                message:'Answer is required'
            })
        }

        const user = await userModel.findOne({email})
        
        if(!user){
            res.status(404).send({
                success:false,
                message:'Wrong email or password',

            })
        }

        const hash = await hashPassword(newPassword)

        await userModel.findByIdAndUpdate(user._id,{password:hash})

        res.status(200).send({
            success:true,
            message:'Password Reset Successfully'
        })
        
    } catch (error) {
        console.log(error)
        res.status(404).send({
            success:false,
            message:'Something went wrong',
            error
        })
        
    }
}

