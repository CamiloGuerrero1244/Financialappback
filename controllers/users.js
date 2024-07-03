const mongoose=require('mongoose');
const {userModel}=require('../models');
const {handleHttpError,handleErrorResponse} = require("../utils/handleError");
const {encrypt,compare}=require("../utils/handlepassword");
const { tokenSign } = require("../utils/handletoken");

const {matchedData}=require("express-validator");


const parseId = (id) => {
    return new mongoose.Types.ObjectId(id)
};


const getUser= async (req, res) => {
    try {
        const { page = 1, limit = 3 } = req.query; // Obtén la página y el límite de los parámetros de la solicitud
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };
        const docs = await userModel.paginate({}, options);
        res.send(docs);
    } catch (err) {
        res.status(500).send({ error: 'Error al obtener los datos', details: err });
    }
};


const updateUser = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const docs = await userModel.updateOne({ _id: parseId(id) }, body);
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al actualizar el documento', details: err });
    }
};
    

const createUser = async (req, res) => {
    try {
        const body = matchedData(req);

        const checkIsExist = await userModel.findOne({ email: body.identification });
    if (checkIsExist) {
      handleErrorResponse(res, "EL USUARIO YA EXISTE", 401);
      return;
    };

    const password=await encrypt(body.password);
    const bodyInsert={...body,password};
    const data=await userModel.create(bodyInsert);
            // Devolver los datos creados
        res.send({ data });
    } catch (err) {
        // Manejar errores de duplicados y otros errores
        
        res.status(500).send({ error: 'Error al insertar los datos', details: err });
    }
};

const loginCtrl = async (req, res) => {
    try {
      const body = matchedData(req);
      const user = await userModel.findOne({ identification: body.identification });
      if (!user) {
        handleErrorResponse(res, "USUARIO NO REGISTRADO", 404);
        return;
      }
      const checkPassword = await compare(body.password, user.password);
  
      if (!checkPassword) {
        handleErrorResponse(res, "PASSWORD INCORRECTO", 402);
        return;
      }
  
      const tokenJwt = await tokenSign(user);
  
      const data = {
        token: tokenJwt,
        user: user,
      };
  
      res.send({ data });
    } catch (e) {
      handleHttpError(res, e);
    }
  };
  



const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const docs = await userModel.deleteOne({ _id: parseId(id) });
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al eliminar el documento', details: err });
    }
};


module.exports = {getUser, updateUser, deleteUser,createUser,loginCtrl};
