const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const TransactionSchema = new mongoose.Schema({
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ['income', 'expense', 'asset', 'liability'], required: true },
    amount: { type: Number, required: true },
    description: String,
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
},
{
    timestamps:true,
    versionKey:false
}

);

TransactionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Transaction', TransactionSchema);
