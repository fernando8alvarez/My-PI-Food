import React from "react";
import s from './LandingPage.module.css';
import { Link } from 'react-router-dom';
import logo from '../image/Logo.png'

export default function LandingPage() {
    return (
        <div className={s.container} >
            <div className={s.centro}>
                <img src={logo} alt="img not found" className={s.image} />
                <div >
                    <Link to="/home">
                        <button className={s.btn}><span className={s.titulo}>Enter here</span></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
