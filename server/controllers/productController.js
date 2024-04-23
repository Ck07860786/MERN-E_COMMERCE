import fs from "fs";
import slugify from "slugify";
import ProductModel from "../models/ProductModel.js";
import categoryModel from "../models/categoryModel.js";

export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;
    const { image } = req.files;

    //validations
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
      case !category:
        return res.status(500).send({ error: "Category is required" });
     
      case image && image.size > 1000000:
        return res
          .status(500)
          .send({ error: "Imagage is required & shuld be less than mb" });
    }

    const product = new ProductModel({ ...req.fields, slug: slugify(name) });
    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in create product",
      error,
    });
  }
};

//get product
export const getAllProductController = async (req, res) => {
  try {
    const product = await ProductModel.find({})
      .select("-image")
      .limit("10")
      .sort({ createdAt: -1 })
      .populate("category");
    res.status(200).send({
      success: true,
      message: "all products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching the product",
      error,
    });
  }
};

// sigle product access
export const getSingleProductController = async (req, res) => {
  const product = await ProductModel.findOne({ slug: req.params.slug })
    .select("-image")
    .populate("category");
  res.status(200).send({
    success: true,
    message: "product fetched succesfully",
    product,
  });
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching single product",
      error,
    });
  }
};

//get image

export const getProductImageController = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.pid).select("image");
    if (product.image.data) {
      res.set("Content-type", product.image.contentType);
      return res.status(200).send(product.image.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in fetching the image",
      error,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in deleting the product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
    req.fields;
  const { image } = req.files;

  //validations
  switch (true) {
    case !name:
      return res.status(500).send({ error: "Name is required" });
    case !price:
      return res.status(500).send({ error: "Price is required" });
    case !description:
      return res.status(500).send({ error: "Description is required" });
    case !quantity:
      return res.status(500).send({ error: "quantity is required" });
    case !category:
      return res.status(500).send({ error: "Category is required" });
    case image && image.size > 1000000:
      return res
        .status(500)
        .send({ error: "Imagage is required & shuld be less than MB" });
  }

  const product = await ProductModel.findByIdAndUpdate(req.params.pid,
    { ...req.fields, slug: slugify(name) },{new:true});
    
  if (image) {
    product.image.data = fs.readFileSync(image.path);
    product.image.contentType = image.type;
  }
  await product.save();

  res.status(201).send({
    success: true,
    message: "product updated successfully",
    product,
  });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in updating the product",
      error,
    });
  }
};

// serach product

export const searchProductController = async(req,res)=>{
  try {
    const {keyword}= req.params
    const result = await ProductModel.find({
      $or:[
        {name:{$regex:keyword, $options:"i"}},
        {description:{$regex:keyword, $options:"i"}}
      ]
    }).select('-image')
    res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in serach product',
      error
    })
  }
}

// category-product

export const categoryProductController = async(req,res)=>{
  try {
    const category = await categoryModel.findOne({slug:req.params.slug})
    const product = await ProductModel.find({category}).populate('category')
    res.status(200).send({
      success:true,
      category,
      product,
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'error in getting product',
      error
    })
  }

}
