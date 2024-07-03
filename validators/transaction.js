const { check } = require("express-validator");
const {validateResult}=require('../utils/handlevalidator');

const validatorCreateTransaction=[
    check("date").exists().notEmpty(),
    check("type").exists().notEmpty(),
    check("amount").exists().notEmpty(),
    check("description").exists().notEmpty(),
    check("categoryId").exists().notEmpty().isMongoId(),
    check("userId").exists().notEmpty().isMongoId(),
    
    (req,res,next)=>{
        validateResult(req, res, next);
    }
    

];

module.exports={validatorCreateTransaction};