const express =require('express');

const tokenAuthMiddle=require('../validators/verifytoken');

const {validatorCreateCategory}=require("../validators/category");

const {
    getCategory,
    getCategorys,
    updateCategory,
    createCategory,
    deleteCategory,
  } = require("../controllers/category");

const router=express.Router();

router.get('/',tokenAuthMiddle,getCategory);


router.post('/',tokenAuthMiddle,validatorCreateCategory,createCategory);


router.put('/',tokenAuthMiddle,updateCategory);


router.delete('/:id',tokenAuthMiddle,deleteCategory);


module.exports= router;