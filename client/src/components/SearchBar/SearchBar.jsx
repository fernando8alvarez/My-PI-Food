import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../actions";
import s from './SearchBar.module.css';

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState(" ");

    function handleInputName(e) {
        e.preventDefault()
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRecipesByName(name));
        setName(" ");
    }

    return (
        <div className={s.container}>
            <input type="text"  className={s.holder} placeholder="¿ What do you want to cook today... ?" onChange={(e) => handleInputName(e)} />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={s.btn}>Search</button>
        </div>
    )
}