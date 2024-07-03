const { check } = require("express-validator");
const {validateResult}=require('../utils/handlevalidator');

const validatorCreateLiability=[
    check("name").exists().notEmpty(),
    check("amount").exists().notEmpty(),
    check("description").exists().notEmpty(),
    check("userId").exists().notEmpty().isMongoId(),
    
    (req,res,next)=>{
        validateResult(req, res, next);
    }
    

];

module.exports={validatorCreateLiability};