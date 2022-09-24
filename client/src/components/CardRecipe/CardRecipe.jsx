import React from "react";
import s from './CardRecipe.module.css';
import { Link } from 'react-router-dom';

export default function CardRecipe({ name, image, diets, id, healthScore }) {

    const typesDiets = diets.map((el) => {
        if (typeof el === 'object') { return <li className={s.items}>{el.name}</li> }
        else { return <li className={s.items}>{el}</li> }
    })

    const score = [1, 2, 3, 4, 5];

    return (
        <div className={s.card}>
            <div className={s.card_landing}>
                <img src={image} className={s.img} alt="img not found" width="300px" />
                <div className={s.name}>{name}</div>
            </div>
            <div className={s.level}>
                <div className={s.tittle}>Health Score: </div>
                {score.map(el => {
                    if (el <= Math.ceil(healthScore / 20)) {
                        return (<div className={s.color}>-</div>)
                    }
                    return <div className={s.empty}>-</div>
                })}
            </div>
            <div className={s.container}>
                <ul className={s.list}>
                    {typesDiets && typesDiets}
                </ul>
            </div>
        </div>
    )
}