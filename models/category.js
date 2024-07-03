const mongoose = require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true }
},
{
    timestamps:true,
    
    versionKey:false
}
);
CategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Category', CategorySchema);
