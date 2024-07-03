const mongoose=require('mongoose');
const {accountsModel}=require('../models');


const parseId = (id) => {
    return new mongoose.Types.ObjectId(id)
};


const getAccount= async (req, res) => {
    try {
        const { page = 1, limit = 30 } = req.query; // Obtén la página y el límite de los parámetros de la solicitud
        const options = {
            page: parseInt(page, 30),
            limit: parseInt(limit, 30)
        };
        const docs = await accountsModel.paginate({}, options);
        res.send(docs);
    } catch (err) {
        res.status(500).send({ error: 'Error al obtener los datos', details: err });
    }
};


const updateAccount = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const docs = await accountsModel.updateOne({ _id: parseId(id) }, body);
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al actualizar el documento', details: err });
    }
};
    

const createAccount = async (req, res) => {
    try {
        const data = req.body;

        // Validar que se hayan enviado datos
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).send({ error: 'No se enviaron datos o los datos son inválidos' });
        }

        // Crear el documento en la base de datos
        const newDoc = await accountsModel.create(data);
        
        // Devolver los datos creados
        res.send({ data: newDoc });
    } catch (err) {
        // Manejar errores de duplicados y otros errores
        if (err.code === 11000) {
            return res.status(400).send({ error: 'Esta persona ya tiene usuario' });
        }
        res.status(500).send({ error: 'Error al insertar los datos', details: err });
    }
};

const deleteAccount = async (req, res) => {
    const { id } = req.params;
    try {
        const docs = await accountsModel.deleteOne({ _id: parseId(id) });
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al eliminar el documento', details: err });
    }
};


module.exports = {getAccount, updateAccount, deleteAccount,createAccount};
