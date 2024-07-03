const mongoose=require("mongoose");

const DB_URI=process.env.DB_URI;
    

module.exports = async () => {
    const dbConnect= async () => {
        try {
            await mongoose.connect(DB_URI, {
                
            });
            console.log('****Conexión correcta*****');
        } catch (err) {
            console.error('***ERROR DE CONEXION!!!', err);
        }
    };

    dbConnect();
};