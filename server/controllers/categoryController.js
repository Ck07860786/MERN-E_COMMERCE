
import categoryModel from '../models/categoryModel.js'
import slugify from 'slugify'
export const createCategoryController=async(req,res)=>{

    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({
                success:false,
                message:'category name is required'
            })
        }

        const existCategory = await categoryModel.findOne({name})
        if(existCategory){
           return res.status(200).send({
                success:false,
                message:'category already exist'
            })
        }

        const category = await new categoryModel({name, slug:slugify(name)}).save()

        res.status(201).send({
            success:true,
            message:'category created successfully',
            category
        })

    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:true,
            message:'Error in creating category',
            error
        })
    }

}

// update categoty

export const updateCategoryController =async(req,res)=>{
    try {
        const {name} = req.body
        const {id} = req.params;

        const category = await categoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'category updated successfully',
            category
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in updating the category',
            error
        })

        
    }
}

// acces category

export const getCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message:'category access successfully',
            category
            
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in getting the category',
            error
        })
    }
}

// single category acces
 export const getSingleCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'category fetched successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in fetching the category',
            error
        })
        
    }
 }

 export const deleteCategoryController=async(req,res)=>{

    try {

        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category deleted successfully'

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while deleting category'

        })
        
    }

 }