const { check } = require("express-validator");
const {validateResult}=require('../utils/handlevalidator');

const validatorCreateCategory=[
    check("name").exists().notEmpty(),
    check("type").exists().notEmpty(),
    
    
    (req,res,next)=>{
        validateResult(req, res, next);
    }
    

];

module.exports={validatorCreateCategory};