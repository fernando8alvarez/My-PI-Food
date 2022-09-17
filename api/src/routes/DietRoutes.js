const { Router } = require('express');
const { Recipe, Diet } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//Ruta que muestra los tipos de dietas que hay en la base de datos
router.get('/', async (req, res, next) => {

    return Diet.findAll()
        .then(data => {
            res.status(200).send(data);
        })
        .catch((error) => {
            next(error);
        })

    // try {
    //     const diet = await Diet.findAll();
    //     res.status(200).send(diet);
    //     //return diet;
    // } catch (error) {
    //     next(error);
    // }
});


module.exports = router;