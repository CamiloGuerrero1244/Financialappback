const { check } = require("express-validator");
const {validateResult}=require('../utils/handlevalidator');

const validatorCreateAsset=[
    check("name").exists().notEmpty(),
    check("value").exists().notEmpty(),
    check("description").exists().notEmpty(),
    check("userId").exists().notEmpty().isMongoId(),
    
    
    (req,res,next)=>{
        validateResult(req, res, next);
    }
    

];

module.exports={validatorCreateAsset};