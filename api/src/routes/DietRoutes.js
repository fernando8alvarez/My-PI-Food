const { Router } = require('express');
const { getTypeDiets } = require('../controllers/functions.js');
const { Recipe, Diet } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//Ruta que muestra los tipos de dietas que hay en la base de datos
router.get('/', (req, res, next) => {

    return Diet.findAll()
        .then(data => {
            res.send(data);
        })
        .catch((error) => {
            next(error);
        })

    // try {
    //     const diet = await Diet.findAll();
    //      return diet;
    //     res.status(201).send(probando);
    // } catch (error) {
    //     next(error);
    // }
})

module.exports = router;