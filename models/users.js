const mongoose=require('mongoose');
const mongoosePaginate=require('mongoose-paginate-v2');

const UserScheme= new mongoose.Schema(
    { 
        identification:{type:Number,required:true,unique:true},
        name:{type:String, required:true},
        lastname:{type:String,required:true},
        phone:{type:String,required:true},
        email:{type:String,required:true},
        password:{type:String,required:true},
        rol:{type:["user","admin"],default:"user"}

    },
    {
        timestamps:true,
        versionKey:false
    }
   );

   UserScheme.plugin(mongoosePaginate);
   module.exports=  mongoose.model("Users",UserScheme)