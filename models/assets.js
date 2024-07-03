const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const AssetSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true },
    description: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true }
},
{
    timestamps:true,
    versionKey:false
}
);
AssetSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Asset', AssetSchema);