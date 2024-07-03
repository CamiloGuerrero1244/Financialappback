const model=require('../models/transaction');
const mongoose=require('mongoose');
const {transactionModel}=require('../models');


const parseId = (id) => {
    return new mongoose.Types.ObjectId(id)
};


const getTransaction= async (req, res) => {
    try {
        const { page = 1, limit = 3 } = req.query; // Obtén la página y el límite de los parámetros de la solicitud
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };
        const docs = await transactionModel.paginate({}, options);
        res.send(docs);
    } catch (err) {
        res.status(500).send({ error: 'Error al obtener los datos', details: err });
    }
};

const getTotalByCategory = async (req, res) => {
    const { category, startDate, endDate } = req.query;
    try {
        const query = {
            categoryId: category
        };
        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        const total = await Transaction.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);
        if (total.length > 0) {
            res.json({ total: total[0].totalAmount });
        } else {
            res.json({ total: 0 });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        const docs = await transactionModel.updateOne({ _id: parseId(id) }, body);
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al actualizar el documento', details: err });
    }
};
    

const createTransaction = async (req, res) => {
    try {
        const data = req.body;

        // Validar que se hayan enviado datos
        if (!data || Object.keys(data).length === 0) {
            return res.status(400).send({ error: 'No se enviaron datos o los datos son inválidos' });
        }

        // Crear el documento en la base de datos
        const newDoc = await transactionModel.create(data);
        
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

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    try {
        const docs = await transactionModel.deleteOne({ _id: parseId(id) });
        res.send({ items: docs });
    } catch (err) {
        res.status(500).send({ error: 'Error al eliminar el documento', details: err });
    }
};


module.exports = {getTransaction, updateTransaction, deleteTransaction,createTransaction,getTotalByCategory};
