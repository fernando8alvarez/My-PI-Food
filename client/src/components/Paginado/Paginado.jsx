import React from "react";
import s from './Paginado.module.css'

export default class Paginado extends React.Component {
    render() {
        const pageNumber = [];//Numero de paginado por cada 9 recetas
        for (let i = 1; i <= Math.ceil(this.props.allRecipes / this.props.recipesPerPage); i++) {
            pageNumber.push(i);
        }

        const next = () => {
            if (this.props.page < pageNumber.length) this.props.paginate(this.props.page + 1);
            if (this.props.page > this.props.number + 1 && this.props.page < pageNumber.length) this.props.numberPaginate(this.props.number + 1);
        }

        const previous = () => {
            if (this.props.page > 1) this.props.paginate(this.props.page - 1)
            if (this.props.page < this.props.number + 1 && this.props.page > 1) this.props.numberPaginate(this.props.number - 1);
        }

        return (

            <div className={s.containerP}>
                <button onClick={() => { previous() }} className={s.btnNext}>
                    <svg aria-hidden="true" width="30px" height="30px" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </button>
                <nav className={s.paginado}>
                    <button
                        onClick={() => { this.props.paginate(this.props.number); }}
                        className={this.props.page === this.props.number ? s.hover : s.item}
                    >
                        {this.props.number}
                    </button>
                    {
                        (this.props.allRecipes > this.props.recipesPerPage || this.props.allRecipes >= this.props.recipesPerPage * 2) && (
                                <button onClick={() => { this.props.paginate(this.props.number + 1) }} class={this.props.page === this.props.number + 1 ? s.hover : s.item}>
                                    {this.props.number + 1}
                                </button>
                        )
                    }
                    {
                        (this.props.allRecipes > this.props.recipesPerPage || this.props.allRecipes >= this.props.recipesPerPage * 3) && (
                                <button onClick={() => { this.props.paginate(this.props.number + 2) }} class={this.props.page === this.props.number + 2 ? s.hover : s.item}>
                                    {this.props.number + 2}
                                </button>
                        )
                    }
                </nav>
                <button onClick={() => { next() }} className={s.btnPrev}>
                    <svg aria-hidden="true" width="30px" height="30px" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </button>
            </div>
        )
    }
}