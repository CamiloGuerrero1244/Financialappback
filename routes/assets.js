const express =require('express');

const tokenAuthMiddle=require('../validators/verifytoken');

const {validatorCreateAsset}=require("../validators/assets");

const {
    getAsset,
    getAssets,
    updateAsset,
    createAsset,
    deleteAsset,
  } = require("../controllers/assets");

const router=express.Router();

router.get('/',tokenAuthMiddle,getAsset);


router.post('/',tokenAuthMiddle,validatorCreateAsset,createAsset);


router.put('/',tokenAuthMiddle,updateAsset);


router.delete('/:id',tokenAuthMiddle,deleteAsset);


module.exports= router;