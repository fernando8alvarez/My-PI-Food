import React from "react";
import loading from "../image/Loading.gif";
import s from './Loading.module.css'


export default function Loading() {
    return (
        <div className={s.container}>
            <img className={s.loader} src={loading} alt="loading" width="690px" height="388px" />
        </div>
    )
}