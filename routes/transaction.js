const express =require('express');

const tokenAuthMiddle=require('../validators/verifytoken');

const {validatorCreateTransaction}=require('../validators/transaction')

const {
    getTransaction,
    getTotalByCategory,
    updateTransaction,
    createTransaction,
    deleteTransaction,
  } = require("../controllers/transaction");

const router=express.Router();





router.get('/',tokenAuthMiddle,getTransaction);

router.get('/',tokenAuthMiddle,getTotalByCategory);


router.post('/',tokenAuthMiddle,validatorCreateTransaction,createTransaction);


router.put('/',tokenAuthMiddle,updateTransaction);


router.delete('/:id',tokenAuthMiddle,deleteTransaction);

module.exports= router;