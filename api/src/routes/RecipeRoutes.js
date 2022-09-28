const { Router } = require('express');
const { getAllInfo, getAllInfoForId } = require('../controllers/functions.js');
const { Recipe, Diet } = require('../db.js');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

//Ruta N°1 (GET): Muestra todas las recetas / filtra las recetas por el nombre que venga por query
router.get('/', async (req, res, next) => {

    const { name } = req.query;
    const allRecipes = await getAllInfo();

    if (name) {
        try {
            let recipe = await allRecipes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            recipe.length ? res.status(200).send(recipe) : res.status(404).send("Recipe not found!");
        } catch (error) {
            next(error);
        }
    }
    else {
        res.status(200).send(allRecipes);
    }
});

//Ruta N°2 (GET): Muestra una receta por su id (puede venir de la BD o API)
router.get('/:idRecipe', async (req, res, next) => {

    const { idRecipe } = req.params;

    try {
        const recipeDetails = await getAllInfoForId(idRecipe);
        res.status(200).send(recipeDetails);
    } catch (error) {
        res.status(404).send('Recipe not found!');
    }
});

//Ruta N°3 (POST): crea un receta y lo almacena en la BD
router.post("/", async (req, res, next) => {

    const { name, summary, healthScore, steps, diets, image } = req.body;

    try {
        let createRecipe = await Recipe.create({
            name,
            summary,
            healthScore,
            steps,
            image,
        })

        let recipeDietDb = await Diet.findAll({
            where: { name: diets }
        });

        createRecipe.addDiet(recipeDietDb);
        res.status(200).send(createRecipe);

    } catch (error) {
        next(error);
    }

});

module.exports = router;