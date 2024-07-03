const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const AccountSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    type: { type: String, enum: ['bank', 'credit_card', 'cash'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
},
{
    timestamps:true,
    versionKey:false
}
);
AccountSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Account', AccountSchema);
