const asyncHandler = require("../utils/asyncHandler.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const Algorithm = require("../models/AlgorithmModel.js");
const mongoose = require("mongoose");

const addAlgorithm = asyncHandler(async (req, res) => {
     const { id, name, isActive, popular } = req.body;
     const existingAlgorithm = await Algorithm.findOne({ name });
     if (existingAlgorithm) {
          throw new ApiError(409, "Algorithm name already exists");
     }
     const newAlgorithm = await Algorithm.create({
          id,
          name,
          isActive,
          popular,
     });
     return res
          .status(201)
          .json(
               new ApiResponse(
                    200,
                    newAlgorithm,
                    "Algorithm Created successfully"
               )
          );
});

// router.post('/add-algorithm', async (req, res) =>{
//     try{
//         const {id, name, isActive, popular} = req.body;

//         const existingAlgorithm = await Algorithm.findOne({ name });
//         if (existingAlgorithm) {
//             return res.status(400).json({ message: 'Algorithm name already exists' });
//         }
//         const algorithm = new Algorithm({
//             id, name,isActive, popular
//         });
//         await algorithm.save();
//         res.status(201).json({message: 'Algorithm Created successfully', AlgorithmID: algorithm.id})
//     }
//     catch(err)
//     {
//         res.status(500).json({error: 'Server error', details: err});
//     }
// });
//get method
const getAllAlgorithm = asyncHandler(async (req, res) => {
     const algorithm = await Algorithm.find({});
     const responseData = {
          algorithm,
     };

     return res
          .status(200)
          .json(
               new ApiResponse(
                    200,
                    responseData,
                    "Algorithm fetched successfully"
               )
          );
});

// router.get('/get-algorithm',async (req , res) => {
//     try{
//         Algorithm.find({}, 'id name slug isActive popular')
//             .then(results => {
//                 res.status(200).json({results})
//             })
//             .catch(err => {
//                 res.status(500).json({err})
//             });
//     }
//     catch(err)
//     {
//         res.status(500).json({error:"Error in algorithm",details:err})
//     }
// });
//Edit category API using Put method
// router.put('/update-algorithm/:id',async(req, res)=>{
//     let id = String(req.params.id);
//     if (id.startsWith('id:'))
//     {
//         id = id.replace('id:', '');
//     }
//     const { name,isActive,description } = req.body;
//     try{
//         const algorithm = await Algorithm.findById(id);
//         if(!algorithm)
//         {
//             return res.status(404).json({ message: 'Algorithm not found' });
//         }
//         algorithm.description = description || algorithm.description;
//         algorithm.name = name || algorithm.name;
//         algorithm.isActive = isActive !== undefined ? isActive : algorithm.isActive;
//         algorithm.updatedAt = new Date();
//         const updatedalgorithm = await algorithm.save();
//         res.status(200).json(updatedalgorithm);
//     }
//     catch(err)
//     {
//         res.status(500).json({ message: 'Error updating category', err });
//     }
// });
//Delete category
// router.delete('/delete-algorithm/:id', async (req, res) =>{
//     let id = String(req.params.id);
//     if (id.startsWith('id:'))
//     {
//         id = id.replace('id:', '');
//     }
//     if (!id) {
//         return res.status(400).json({ message: 'Algorithm is required' });
//     }
//     try{
//         const deletedAlgorithm = await Algorithm.findByIdAndDelete(id);
//         if (!deletedAlgorithm) {
//             return res.status(404).json({ message: 'Algorithm not found' });
//         }
//         res.status(200).json({ message: 'Algorithm deleted successfully', deletedAlgorithm });
//     }
//     catch(err)
//     {
//         res.status(500).json({ message: 'Error deleting algorithm', err });
//     }
// } );
module.exports = {
     addAlgorithm,
     getAllAlgorithm,
};
