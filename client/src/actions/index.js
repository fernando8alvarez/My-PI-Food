import axios from 'axios';
export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const FILTER_BY_TYPES_DIET = "FILTER_BY_TYPES_DIET";
export const FILTER_RECIPES_ADDED = "FILTER_RECIPES_ADDED";
export const FILTER_RECIPES_HEALTH_SCORE = "FILTER_RECIPES_HEALTH_SCORE";
export const ORDER_RECIPES = "ORDER_RECIPES";
export const ORDER_RECIPES_HEALTH_SCORE = "ORDER_RECIPES_HEALTH_SCORE";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPES = "POST_RECIPES";


//Action N°1: traer todos los recipes de la api
export function getAllRecipes() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/recipes");
        return dispatch({ type: GET_ALL_RECIPES, payload: json.data });
    }
}

//Action N°2: Filtrar rectas por tipo de dietas
export function filterRecipesByTypesDiet(payload) {
    return {
        type: FILTER_BY_TYPES_DIET,
        payload: payload
    }
}

//Action N°3: Filtrar recetas añadidas y existentes
export function filterRecipesAdded(payload) {
    return {
        type: FILTER_RECIPES_ADDED,
        payload: payload
    }
}

//Action N°4: Filtrar recetas por nivel saludable
export function filterRecipesHealthScore(payload) {
    return {
        type: FILTER_RECIPES_HEALTH_SCORE,
        payload: payload
    }
}

//Action N°5: Odernar recetas alfaveticamente (A-Z o Z-A)
export function orderRecipesAlphabetically(payload) {
    return {
        type: ORDER_RECIPES,
        payload: payload
    }
}

//Action N°6: Odernar recetas por saludable (Asc y Des)
export function orderRecipesHealthScore(payload) {
    return {
        type: ORDER_RECIPES_HEALTH_SCORE,
        payload: payload
    }
}

//Action N°7:Obtener recetas por nombre
export function getRecipesByName(name) {

    return (dispatch) => {
        try {
            return axios.get(`http://localhost:3001/recipes?name=${name}`)
                .then((recipesPerName) => {
                    return dispatch({ type: GET_RECIPES_NAME, payload: recipesPerName.data })
                })
        } catch (error) {
            console.log(error);
        }
    }
}

//Action N°8: Traer todas las dietas de la BD
export function getDiets() {
    return async function (dispatch) {
        const json = await axios.get("http://localhost:3001/diets");
        return dispatch({ type: GET_DIETS, payload: json.data })
    }
}

//Action N°9:
export function postRecipes(payload){
    return async function (dispatch) {
        const json = await axios.post("http://localhost:3001/recipes", payload);
        console.log(json);
        return json;
    }
}