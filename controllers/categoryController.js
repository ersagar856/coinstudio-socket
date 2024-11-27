const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Category = require("../models/CategoryModel.js");
const mongoose = require("mongoose");
//Add category

const addCategory = asyncHandler(async (req, res) => {
    const {id, name, isActive, popular} = req.body;
    const existingCategory = await Category.findOne({ name});
    if (existingCategory) {
      throw new ApiError(409, "Category name already exists");
    }
    const newCategory = await Category.create({
        id, name,isActive, popular
    });
    return res
      .status(201)
      .json(
        new ApiResponse(200, newCategory, "Category Created successfully")
      );
      
  });
//get method
const getAllCategory = asyncHandler(async (req, res) => {
    
    const category = await Category.find({});
    const responseData = {
        category
    };
  
    return res
      .status(200)
      .json(new ApiResponse(200, responseData, "Category fetched successfully"));
  });
//Edit category API using Put method
// router.put('/categories/:id',async(req, res)=>{
//     let id = String(req.params.id);
//     if (id.startsWith('id:')) 
//     {
//         id = id.replace('id:', '');
//     }
//     const { name,isActive,description } = req.body;
//     try{
//         const category = await Category.findById(id);
//         if(!category) 
//         {
//             return res.status(404).json({ message: 'Category not found' });
//         }
//         category.description = description || category.description;
//         category.name = name || category.name;
//         category.isActive = isActive !== undefined ? isActive : category.isActive;
//         category.updatedAt = new Date();
//         const updatedCategory = await category.save();
//         res.status(200).json(updatedCategory);
//     }
//     catch(err)
//     {
//         res.status(500).json({ message: 'Error updating category', err });
//     }
// });
//Delete category 
// router.delete('/categories/:id', async (req, res) =>{
//     let id = String(req.params.id);
//     if (id.startsWith('id:')) 
//     {
//         id = id.replace('id:', '');
//     }
//     if (!id) {
//         return res.status(400).json({ message: 'Category ID is required' });
//     }
//     try{
//         const deletedCategory = await Category.findByIdAndDelete(id);
//         if (!deletedCategory) {
//             return res.status(404).json({ message: 'Category not found' });
//         }
//         res.status(200).json({ message: 'Category deleted successfully', deletedCategory });
//     }
//     catch(err)
//     {
//         res.status(500).json({ message: 'Error deleting category', err });
//     }
// } );
module.exports = {
    addCategory,
    getAllCategory
}

