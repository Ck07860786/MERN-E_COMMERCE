import express from "express";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
import {
  categoryProductController,
  createProductController,
  deleteProductController,
  getAllProductController,
  getProductImageController,
  getSingleProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

//create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//update product
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
  );

// get all product
router.get("/get-product", getAllProductController);

//get single product
router.get("/get-product/:slug", getSingleProductController);

//get product image
router.get('/product-image/:pid',getProductImageController)

// delete product
router.delete('/delete-product/:pid',deleteProductController)

//serach product
router.get('/search/:keyword' ,searchProductController)


// category
router.get('/category-product/:slug',categoryProductController)
export default router;
