const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const RecipeRouters = require('./RecipeRoutes.js');
const DietRouters = require('./DietRoutes.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/recipes", RecipeRouters)
router.use("/diets", DietRouters)


module.exports = router;
