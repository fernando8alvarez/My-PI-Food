const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db.js');

//FUNCION N°1: Traer toda la informacion de la API
const getApiInfo = async () => {

    const apiInfo = await axios.get('https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5');
    //'https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5'
    //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`

    const dataInfo = await apiInfo.data.results.map((el) => {

        return {
            id: el.id,
            name: el.title,
            summary: el.summary,
            image: el.image,
            healthScore: el.healthScore,
            diets: el.diets,
            steps: el.analyzedInstructions[0]?.steps.map((e) => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    });

    return dataInfo;//Devuelve un arreglo de objetos
};

//FUNCION N°2: Traer toda la informacion de la BD
const getDbInfo = async () => {
    const Dbinfo = await Recipe.findAll({
        include: {
            model: Diet,// de la tabla Diet
            attributes: ["name"], //traer el atributo name
            through: {
                attributes: []
            }
        }
    });
    return Dbinfo;//Devuelve un arreglo de objetos
}

//FUNCION N°3: Juntar y traer tanto la informacion de la BD como la de la API
const getAllInfo = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo);

    return totalInfo;//Arreglo de objeto tanto de la api como de la BD
}

//FUNCION N°4:Filtrar una receta por id en la API con promesas
// const getRecipeForIdApi = (id) => {
//     const recipeId = axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
//         .then(res => {
//             return {
//                 name: res.data.title,
//                 summary: res.data.summary,
//                 image: res.data.image,
//                 healthScore: res.data.healthScore,
//                 steps: res.data.analyzedInstructions[0]?.steps.map((el) => {
//                     return {
//                         number: el.number,
//                         step: el.step,
//                     };
//                 }),
//                 diets: res.data.diets.map(e => e)
//             }
//         })
//         .catch(error => error);
// }

//FUNCION N°4: Filtrar una receta por id en la API con async/await
const getRecipeForIdApi = async (id) => {
    const recipeId = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    const recipe = await recipeId.data;

    return {
        name: recipe.title,
        summary: recipe.summary.replaceAll(/<[^>]*>?/g,""),
        image: recipe.image,
        healthScore: recipe.healthScore,
        steps: recipe.analyzedInstructions[0]?.steps.map((el) => {
            return {
                number: el.number,
                step: el.step,
            };
        }),
        diets: recipe.diets.map(e => e)
    }
}

//FUNCION N°5:Filtrar una receta por id en la Bd
const getRecipeForIdDb = async (id) => {

    const recipePk = await Recipe.findByPk(id, {
        include: {
            model: Diet,// de la tabla Diet
            attributes: ["name"], //traer el atributo name
            through: {
                attributes: []
            }
        }
    });

    if (recipePk) {

        return ({
            name: recipePk.name,
            summary: recipePk.summary,
            image: recipePk.image,
            healthScore: recipePk.healthScore,
            steps: recipePk.steps.map((el) => {
                return {
                    number: el.number,
                    step: el.step,
                };
            }),
            diets: recipePk.diets.map(e => e.name)
        })
    }
    else {
        throw new Error();
    }
}

//FUNCION N°6: Filtrar una receta Dependiendo de la id recibo (si va a ser de la api o de la BD)
const getAllInfoForId = async (id) => {
    
    return id.length > 15 ? await getRecipeForIdDb(id) : await getRecipeForIdApi(id);

}

//FUNCION N°7: Cargar los tipos de dietas existentes
const getTypeDiets = async () => {

    const typeDiets = [];
    const apiInfo = await getApiInfo();

    apiInfo.forEach(e => {
        for (let i = 0; i < e.diets.length; i++) {
            if (!typeDiets.includes(e.diets[i])) typeDiets.push(e.diets[i]);
        }
    })

    typeDiets.forEach(e => Diet.create({ name: e }));

}

module.exports = {
    getApiInfo,
    getDbInfo,
    getAllInfo,
    getAllInfo,
    getAllInfoForId,
    getTypeDiets
}

