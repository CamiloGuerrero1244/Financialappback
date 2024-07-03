const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const LiabilitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
},
{
    timestamps:true,
    versionKey:false
}
);

LiabilitySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Liability', LiabilitySchema);
