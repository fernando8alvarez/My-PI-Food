import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions";
import s from './SearchBar.module.css';
import { Link } from 'react-router-dom';

export default function SearchBar({ paginate, numberPaginate }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputName(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit() {
        dispatch(getRecipesByName(name));
        setName("");
        numberPaginate(1);
        paginate(1);
    }

    return (
        <div className={s.container}>
            <Link to='/'>
                <button className={s.btn3}>Inicio</button>
            </Link>
            <input type="text" className={s.holder} placeholder="¿ What do you want to cook today... ?" value={name} onChange={(e) => handleInputName(e)} />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={s.btn}>Search</button>
            <Link to='/home/create-recipes'>
                <button className={s.btn2}>Register recipe</button>
            </Link>
        </div>
    )
}