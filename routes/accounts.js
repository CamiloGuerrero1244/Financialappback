const express =require('express');

const tokenAuthMiddle=require('../validators/verifytoken');

const {validatorCreateAccount}=require("../validators/accounts");

const {
    getAccount,
    getAccounts,
    updateAccount,
    createAccount,
    deleteAccount,
  } = require("../controllers/accounts");

const router=express.Router();

router.get('/',tokenAuthMiddle,getAccount);


router.post('/',tokenAuthMiddle,validatorCreateAccount,createAccount );


router.put('/',tokenAuthMiddle,updateAccount);


router.delete('/:id',tokenAuthMiddle,deleteAccount);


module.exports= router;