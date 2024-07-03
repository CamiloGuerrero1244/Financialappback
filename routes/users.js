const express =require('express');

const tokenAuthMiddle=require('../validators/verifytoken');

const {validatorCreateUser,validateLogin}=require('../validators/users')

const {
    getUser,
    getUsers,
    updateUser,
    createUser,
    deleteUser,
    loginCtrl
  } = require("../controllers/users");

const router=express.Router();





router.get('/',tokenAuthMiddle,getUser);


router.post('/register',validatorCreateUser,createUser);


router.post('/login',validateLogin,loginCtrl);


router.put('/:id',tokenAuthMiddle,updateUser);


router.delete('/:id',tokenAuthMiddle,deleteUser);


module.exports= router;