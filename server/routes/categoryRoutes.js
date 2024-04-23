import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
const router = express.Router();

//routing
// craete category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

// update category

router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Acces category

router.get("/get-category", getCategoryController);

// singe category access

router.get('/single-category/:slug', getSingleCategoryController)

//delete category

router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router;
