const { check } = require("express-validator");
const {validateResult}=require('../utils/handlevalidator');


const validateLogin = [
    check("identification").exists().notEmpty(),
    check("password").exists().notEmpty(),
    (req, res, next) => {
      validateResult(req, res, next);
    },
  ];




const validatorCreateUser=[
    check("identification").exists().notEmpty(),
    check("name").exists().notEmpty(),
    check("lastname").exists().notEmpty(),
    check("phone").exists().notEmpty(),
    check("email").exists().notEmpty().isEmail(),
    check("password").exists().notEmpty().isLength({min:4,max:10}),
    check("rol").exists().notEmpty(),
    (req,res,next)=>{
        validateResult(req, res, next);
    }
    

];

module.exports={validatorCreateUser,validateLogin};