import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDeteils } from "../../actions";
import s from "./Detail.module.css";
import imagen from "../image/PlatoDefault.jpg"


export default function Detail(props) {
    const dispatch = useDispatch();
    const myRecipe = useSelector(state => state.detail)[0];

    useEffect(() => {
        dispatch(getDeteils(props.match.params.id))
        return () => dispatch(getDeteils({}))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    const score = [1, 2, 3, 4, 5];
    console.log(myRecipe);


    return (
        <div className={s.fondo}>
            <div className={s.container}>
                <div className={s.tittle}>Recipe Details</div>
                <Link to="/home"> <button className={s.btn} >Return</button> </Link>
            </div>

            <div className={s.total}>
                <div className={s.container2}>
                    <div className={s.container3}>
                        <div>
                            <img src={myRecipe.image?myRecipe.image:imagen} alt="" width="400px" height="300px" className={s.imge} />
                        </div>
                        <div>
                            <div className={s.container5}>
                                <div className={s.tittle2}>{myRecipe.name}</div>
                            </div>

                            <div className={s.level}>
                                <div className={s.text}>HeakthScore:</div>
                                <div>
                                    {score.map(el => el <= Math.ceil(myRecipe.healthScore / 20) ? (<div className={s.color}></div>) : (<div className={s.empty}></div>))}
                                </div>
                            </div>
                            <p >{myRecipe.summary}</p>
                        </div>
                    </div>
                </div>
                <div className={s.inferior}>
                    <div className={s.container4}>
                        <div className={s.tittle3}>Types diets:</div>
                        <ul className={s.list}>
                            {myRecipe.diets && myRecipe.diets.map((el) => { return <li className={s.items}>{el}</li> })}
                        </ul>
                    </div>

                    <div className={s.container6}>
                        {myRecipe.steps && myRecipe.steps.map((el) => {
                            return (
                                <div className={s.steps}>
                                    <div className={s.step}>Step: {el.number}</div>
                                    <div className={s.text2}>{el.step}</div>
                                </div>)
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}