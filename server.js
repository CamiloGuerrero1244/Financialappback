require('dotenv').config();
const express=require('express');
const cors=require('cors');
const dbInit=require('./config/mongo');
const app=express();



app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

const port=process.env.PORT || 3000


app.use("/api", require("./routes"));

app.listen(port, ()=>{
    console.log(`la app esta lista en http://localhost:${port}`)
})

dbInit();
