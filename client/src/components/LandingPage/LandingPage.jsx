import React from "react";
import s from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import logo from '../image/Logo.png';
import linkedin from './img/linkedin.png';
import github from './img/github.png';
import repo from './img/programacion.png';

export default function LandingPage() {
    return (
        <div className={s.container} >
            <div className={s.centro}>
                <img src={logo} alt="img not found" className={s.image} />
                <div className={s.tittle}>Welcome</div>
                <p className={s.parrafo}>Here you can find healthy recipes to prepare in your day to day, from vegan recipes to gluten-free shakes. You can even add your own recipe, make sure it´s healthy... </p>
                <div className={s.home}>
                    <Link to="/home">
                        <button className={s.btn}><span className={s.titulo}>HOME</span></button>
                    </Link>
                </div>
                <div className={s.url}>
                    <a href="https://www.linkedin.com/in/luis-fernando-alvarez-leccia-3a5b7b151/" title="click to access my LinkedIn">
                        <img src={linkedin} height="50px" alt="not found" />
                    </a>
                    <a href="https://github.com/fernando8alvarez" title="click to access my GitHub">
                        <img src={github} height="50px" alt="not found" />
                    </a>
                    <a href="https://github.com/fernando8alvarez/My-PI-Food" title="click to acces the repository">
                        <img src={repo} height="56px" alt="not dound" />
                    </a>
                </div>
                <div className={s.copyright}>
                    Copyright © | Coded by Luis Fernando Alvarez
                </div>
            </div>
        </div>
    )
}
