const { check } = require("express-validator");
const {validateResult}=require('../utils/handlevalidator');

const validatorCreateAccount=[
    check("name").exists().notEmpty(),
    check("balance").exists().notEmpty(),
    check("type").exists().notEmpty(),
    check("userId").exists().notEmpty().isMongoId(),
    
    
    (req,res,next)=>{
        validateResult(req, res, next);
    }
    

];

module.exports={validatorCreateAccount};