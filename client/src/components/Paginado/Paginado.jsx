import React from "react";
import s from './Paginado.module.css'

export default class Paginado extends React.Component {
    render() {
        const pageNumber = [];//Numero de paginado por cada 9 recetas
        for (let i = 1; i <= Math.ceil(this.props.allRecipes / this.props.recipesPerPage); i++) {
            pageNumber.push(i);
        }

        return (
            <nav className={s.paginado}>
                {
                    pageNumber?.map((number) => {
                        return (
                            <button onClick={() => { this.props.paginate(number); }} key={number} className={this.props.page === number ? s.hover : s.item}>{number}</button>
                        )
                    })
                }
            </nav>
        )
    }
}