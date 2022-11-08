import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    getAllRecipes,
    filterRecipesByTypesDiet,
    filterRecipesAdded,
    filterRecipesHealthScore,
    orderRecipesAlphabetically,
    orderRecipesHealthScore
} from "../../actions/index";
import s from './Home.module.css';
import CardRecipe from "../CardRecipe/CardRecipe";
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import Loading from '../Loading/Loading';
import Swal from 'sweetalert2';


export default function Home() {

    //DISPATH Y TODAS LAS RECETAS
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const allRecipesTotal = useSelector((state) => state.allrecipes)
    const loading = useSelector((state) => state.loading);
    const filterHS = document.getElementById('filterHS');

    useEffect(() => {
        dispatch(getAllRecipes());
    }, [dispatch]);

    //PAGINADO
    const [number, setNumber] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);//[1]Numero de paginado
    const [recipesPerPage, setRecipesPerPage] = useState(9);//[9]Cantidad de recetas por paginas
    const indexLastRecipe = currentPage * recipesPerPage;//[9]Indice de la ultima receta por pagina
    const indexFirstRecipe = indexLastRecipe - recipesPerPage;//[0]Indice de la primera receta por pagina
    const currentRecipesPerPage = allRecipes.slice(indexFirstRecipe, indexLastRecipe);//[0,1,2,3,4,5,6,7,8] Arreglo con las recetas por pagina

    const paginate = (pageNumber) => {//Modifica el numero de paginado
        setCurrentPage(pageNumber);
    }

    const numberPaginate = (n) => {
        setNumber(n);
    };

    //ORDENAMIENTO
    const [order, setOrder] = useState("");//Para que se renderice la pagina al ordenar

    //MANEJO DE EVENTOS

    //Resetear filtros
    function handleClick() {
        dispatch(getAllRecipes());
        setCurrentPage(1);
    }

    //Ordenamiento Alfabeticamente
    function handleSortAlphabetically(e) {
        e.preventDefault();
        if (e.target.value !== "sortAP") {
            dispatch(orderRecipesAlphabetically(e.target.value))
            setCurrentPage(1);
            setOrder(e.target.value);
        }
    }

    //Filtro por tipos de dietas
    function handleFilterDiets(e) {
        e.preventDefault();
        if (e.target.value !== "TypeDiet") {
            const currentTypeDiet = e.target.value;
            const recipeFound = allRecipes.find((e) => {
                return e.diets.find(e => e === currentTypeDiet)
            })

            if (e.target.value === "All" || recipeFound) {
                dispatch(filterRecipesByTypesDiet(e.target.value));
                setCurrentPage(1);
            }
            else {
                Swal.fire({
                    title: 'Sorry!',
                    text: `There are no recipes with the "${e.target.value}" type of diet!`,
                    icon: 'error',
                    confirmButtonColor: "#5e3915",
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(() => {
                    document.getElementById('typeDiet').selectedIndex = 0;
                })
            }
        }

    }
    function handleFilterAddedRecipe(e) {
        e.preventDefault();
        if (e.target.value !== "ShowR") {
            dispatch(filterRecipesAdded(e.target.value));
            setCurrentPage(1);
        }
    }
    function handleFilterHealthScore(e) {
        e.preventDefault();
        if (e.target.value !== "sortHS") {
            const notFound = allRecipes.find(el => Math.ceil(el.healthScore / 20) === Number(e.target.value));
            if (notFound) {
                dispatch(filterRecipesHealthScore(e.target.value));
                setCurrentPage(1);
            }
            else {
                Swal.fire({
                    title: 'Sorry!',
                    text: `There are no recipes with healthScore ${e.target.value}!`,
                    icon: 'error',
                    confirmButtonColor: "#5e3915",
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then(() => {
                    document.getElementById('filterHS').selectedIndex = 0;
                })
            }
        }
    }

    function handleSortHealthScore(e) {
        e.preventDefault();
        if (e.target.value !== "sortAd") {
            dispatch(orderRecipesHealthScore(e.target.value))
            setCurrentPage(1);
            setOrder(e.target.value)
        }
    }

    return (loading || currentRecipesPerPage.length < 1) ? (
        <Loading />
    ) : (
        <div className={s.container}>
            <h1 className={s.tittle}>Today's Recipe</h1>
            <div>
                <SearchBar paginate={paginate} numberPaginate={numberPaginate} />
            </div>
            <div className={s.menu}>

                <button value="reset" onClick={(e) => handleClick(e)} className={s.btn}>Reset filters</button>

                <select name="alphabetically" id="alphabetically" onClick={(e) => handleSortAlphabetically(e)}  >
                    <option value="sortAP" disabled selected hidden > Sort alphabetically</option>
                    <option value="a" >A - Z</option>
                    <option value="z" >Z - A</option>
                </select>

                <select name="typeDiet" id="typeDiet" onClick={(e) => handleFilterDiets(e)} className={s.hover}>
                    <option value="TypeDiet" disabled selected hidden >Types of diet</option>
                    <option value="All" >All</option>
                    <option value="gluten free" >Gluten Free</option>
                    <option value="dairy free" >Dairy Free</option>
                    <option value="lacto ovo vegetarian" >Lacto Ovo Vegetarian</option>
                    <option value="vegan" >Vegan</option>
                    <option value="paleolithic" >Paleolithic</option>
                    <option value="primal" >Primal</option>
                    <option value="whole 30" >Whole 30</option>
                    <option value="pescatarian" >Pescatarian</option>
                    <option value="ketogenic" >Ketogenic</option>
                    <option value="fodmap friendly" >Fodmap Friendly</option>
                </select>

                <select name="HealthScore" id="HealthScore" onClick={(e) => handleSortHealthScore(e)}  >
                    <option value="sortAd" disabled selected hidden>Sort healthScore</option>
                    <option value="ascendent" >Ascendent</option>
                    <option value="descendent" >Descendent</option>
                </select>

                <select name="healthScore" id='filterHS' onClick={(e) => handleFilterHealthScore(e)} className={s.hola} >
                    <option value="sortHS" disabled selected hidden>Type health score</option>
                    <option value="1" >1</option>
                    <option value="2" >2</option>
                    <option value="3" >3</option>
                    <option value="4" >4</option>
                    <option value="5" >5</option>
                </select>

                {/* <select name="ShowRecipe" id="ShowRecipe" onClick={(e) => handleFilterAddedRecipe(e)} >
                    <option value="ShowR" disabled selected hidden>Show recipes</option>
                    <option value="All" >All</option>
                    <option value="Added" >Added</option>
                    <option value="Existent" >Existent</option>
                </select> */}

            </div>

            <div className={s.CardPaginate}>
                <div>
                    <div className={s.card}>
                        {
                            currentRecipesPerPage?.map(el => {
                                return (
                                    <div className={s.link} key={el.id} >
                                        <Link to={`/home/recipes/${el.id}`} className={s.link}>
                                            <CardRecipe image={el.image} name={el.name} diets={el.diets} id={el.id} healthScore={el.healthScore} className={s.link} />
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={s.paginado}>
                    <Paginado allRecipes={allRecipes.length} recipes={allRecipes} recipesPerPage={recipesPerPage} paginate={paginate} page={currentPage} number={number} numberPaginate={numberPaginate} />
                </div>

            </div>


        </div>
    )
}
