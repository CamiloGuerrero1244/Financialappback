const model=require('../models/liability');
const mongoose=require('mongoose');
const {liabilityModel}=require('../models');


const parseId = (id) => {
    return new mongoose.Types.ObjectId(id)
};


const getLiability= async (req, res) => {
    try {
        const { page = 1, limit = 3 } = req.query; // Obtén la página y el límite de los parámetros de la solicitud
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };
        const docs = await liabilityModel.paginate({}, options);
        res.send(docs);
    } catch (err) {
        res.status(500).send({ error: 'Error al obtener los datos', details: err });
    }
};


const updateLiability = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const docs = await liabilityModel.updateOne({ _id: parseId(id) }, body);
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al actualizar el documento', details: err });
    }
};
    

const createLiability = async (req, res) => {
    try {
        const data = req.body;

        // Validar que se hayan enviado datos
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).send({ error: 'No se enviaron datos o los datos son inválidos' });
        }

        // Crear el documento en la base de datos
        const newDoc = await liabilityModel.create(data);
        
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

const deleteLiability = async (req, res) => {
    const { id } = req.params;
    try {
        const docs = await liabilityModel.deleteOne({ _id: parseId(id) });
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al eliminar el documento', details: err });
    }
};


module.exports = {getLiability, updateLiability, deleteLiability,createLiability};
