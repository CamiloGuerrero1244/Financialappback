// const epxress = require('express');
// const fs=require("fs");
// const router = epxress.Router();

// const pathRouter = `${__dirname}`

// const removeExtension = (fileName) => {
//     return fileName.split('.').shift()
// }

// fs.readdirSync(pathRouter).filter((file) => {
//     const fileWithOutExt = removeExtension(file)
//     const skip = ['index'].includes(fileWithOutExt)
//     if (!skip) {
//         router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`)) //TODO: localhost/users
//         console.log('CARGAR RUTA ---->', fileWithOutExt)
//     }
// })

// router.get('*', (req, res) => {
//     res.status(404)
//     res.send({ error: 'Not found' })
// })

// module.exports = router

const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const pathRouter = path.join(__dirname);

const removeExtension = (fileName) => {
    return fileName.split('.').shift();
}

fs.readdirSync(pathRouter).filter((file) => {
    const fileWithOutExt = removeExtension(file);
    const skip = ['index'].includes(fileWithOutExt);
    if (!skip) {
        router.use(`/${fileWithOutExt}`, require(path.join(pathRouter, file))); // Ajuste de la ruta
        console.log('CARGAR RUTA ---->', fileWithOutExt);
    }
});

router.get('*', (req, res) => {
    res.status(404);
    res.send({ error: 'Not found' });
});

module.exports = router;
