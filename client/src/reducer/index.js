
import {
    GET_ALL_RECIPES,
    FILTER_BY_TYPES_DIET,
    FILTER_RECIPES_ADDED,
    FILTER_RECIPES_HEALTH_SCORE,
    ORDER_RECIPES,
    ORDER_RECIPES_HEALTH_SCORE,
    GET_RECIPES_NAME,
    POST_RECIPES,
    GET_DIETS
} from "../actions/index.js";

const initialState = {
    recipes: [],
    allrecipes: [],
    diets: []
}

function rootReducer(state = initialState, actions) {
    const allRecipes = state.allrecipes;

    switch (actions.type) {
        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: actions.payload,
                allrecipes: actions.payload
            }
        case FILTER_BY_TYPES_DIET:
            const filterPerDiet = actions.payload === "All" ? allRecipes : allRecipes.filter((el) => el.diets.includes(actions.payload) && el)
            return {
                ...state,
                recipes: filterPerDiet
            }
        case FILTER_RECIPES_ADDED:
            const filterAddedRecipes = actions.payload === "Added" ? allRecipes.filter(el => el.createdInDb) : allRecipes.filter(el => !el.createdInDb)
            return {
                ...state,
                recipes: actions.payload === "All" ? allRecipes : filterAddedRecipes
            }
        case FILTER_RECIPES_HEALTH_SCORE:
            const filterRecipesHealthScore = allRecipes.filter(el => Math.ceil(el.healthScore / 20) === Number(actions.payload))
            return {
                ...state,
                recipes: filterRecipesHealthScore
            }
        case ORDER_RECIPES:
            let sortArray = actions.payload === "a" ? state.recipes.sort((a, b) => {
                if (a.name > b.name) return 1;//b se situa en un indice menor
                if (b.name > a.name) return -1;//a se situa en un indice menor
                return 0;//No hubo cambios
            }) : state.recipes.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (b.name > a.name) return 1;
                return 0;
            })
            return {
                ...state,
                recipes: sortArray
            }
        case ORDER_RECIPES_HEALTH_SCORE:
            let sortHealthScore = actions.payload === "ascendent" ? state.recipes.sort((a, b) => {
                if (a.healthScore > b.healthScore) return -1;//b se situa en un indice menor
                if (b.healthScore > a.healthScore) return 1;//a se situa en un indice menor
                return 0;//No hubo cambios
            }) : state.recipes.sort((a, b) => {
                if (a.healthScore > b.healthScore) return 1;
                if (b.healthScore > a.healthScore) return -1;
                return 0;
            })
            return {
                ...state,
                recipes: sortHealthScore
            }
        case GET_RECIPES_NAME:
            return {
                ...state,
                recipes: actions.payload
            }
        case POST_RECIPES:
            return {
                ...state
            }
        case GET_DIETS:
            return{
                ...state,
                diets: actions.payload
            }
        default: return state
    }
}

export default rootReducer;