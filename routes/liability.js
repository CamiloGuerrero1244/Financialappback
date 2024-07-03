const express =require('express');

const tokenAuthMiddle=require('../validators/verifytoken');

const {validatorCreateLiability}=require("../validators/liability");

const {
    getLiability,
    getLiabilitys,
    updateLiability,
    createLiability,
    deleteLiability,
  } = require("../controllers/liability");

const router=express.Router();


router.get('/',tokenAuthMiddle,getLiability);


router.post('/',tokenAuthMiddle,validatorCreateLiability,createLiability);



router.put('/',tokenAuthMiddle,updateLiability);


router.delete('/:id',tokenAuthMiddle,deleteLiability);


module.exports= router;