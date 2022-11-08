import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import s from './CreatedRecipe.module.css';
import logo from '../image/Logo.png'

const typeDiest = ["dairy free", "gluten free", "lacto ovo vegetarian", "vegan", "paleolithic", "primal", "whole 30", "pescatarian", "ketogenic", "fodmap friendly"]

export default function CreateRecipes() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    //EXPRESION REGULARES
    const regName = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s\\,\\.\\/\\-\\&]+$/;
    const regSummary = /^[0-9a-zA-ZñÑáéíóúÁÉÍÓÚ\s\n\f\r\\,\\!\\.\\/\\-\\%\\(\\)\\{\\}\\&\\=\\#\\:\\*\\+\\$]+$/;

    //ESTADOS LOCALES
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: [],
        image: "",
        diets: []
    });

    const [pasos, setPasos] = useState({
        number: 0,
        step: ""
    })

    const [errors, setErrors] = useState({});

    //MANEJO DE ERRORES
    function validate(input) {
        let error = {};
        if (!input.name) error.name = `The "name" field is required`;
        else if (!regName.test(input.name)) error.name = `That special character is not allowed!!!`
        else if (!input.summary) error.summary = `The "summary" field is required`;
        else if (!regSummary.test(input.summary)) error.summary = `That special character is not allowed!!!`

        return error;
    }

    //MANEJO DE EVENTOS
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.name === "healthScore" ? e.target.value * 20 : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input);
    }

    function handleCheckBox(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        } else {
            setInput({
                ...input,
                diets: input.diets.filter(el => el !== e.target.value)
            })
        }
    }

    function handleSteps(e) {
        e.preventDefault()
        setPasos({
            ...pasos,
            number: input.steps.length + 1,
            step: e.target.value
        })
    }

    function handleAddStep(e) {
        e.preventDefault()

        if (pasos.step) {
            setInput({
                ...input,
                steps: [...input.steps, pasos]
            });
            setPasos({
                ...pasos,
                step: ""
            })
        }
        else {
            Swal.fire({
                title: 'The field is empty!',
                text: `You have not written any steps to add`,
                icon: 'warning',
                confirmButtonColor: "#5e3915",
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        }

    }

    function handleDeleteStep(e) {
        e.preventDefault();
        if (pasos.number >= 1) {
            setInput({
                ...input,
                steps: input.steps.filter(el => input.steps.length !== el.number)
            })
        }
        else {
            Swal.fire({
                title: "Empty field!!! there is nothing to delete.",
                text: `You must add a step first to be able to delete it.`,
                icon: 'warning',
                confirmButtonColor: "#5e3915",
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (input.name && input.summary) {
            dispatch(postRecipes(input));
            Swal.fire({
                title: "Recipe created successfully!",
                text: `Your information has been saved successfully`,
                icon: 'success',
                confirmButtonColor: "#5e3915",
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            setInput({
                name: "",
                summary: "",
                healthScore: 0,
                steps: [],
                image: "",
                diets: []
            });
            history.push('/home');
        } else {
            Swal.fire({
                title: `The "name" and "summary fields are required!!!"`,
                text: `Please complete these fields to be able to send the form`,
                icon: 'warning',
                confirmButtonColor: "#5e3915",
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        }
    }


    return (
        <div className={s.total}>

            <div className={s.container}>
                <h1 className={s.tittle2}>Create Your Recipe</h1>
                <Link to='/home'><button className={s.btn3}>Return</button></Link>
            </div>

            <form >
                <div>
                    <label htmlFor="name">Name:  </label>
                    <input type="text" name="name" value={input.name} placeholder="  Brief recipe name" key="name" onChange={(e) => handleChange(e)} />
                    {errors.name && (<p className={s.error}>{errors.name}</p>)}
                </div>
                <div>
                    <label htmlFor="summary">Summary:  </label>
                    <input type="text" name="summary" value={input.summary} key="summary" placeholder="  Brief summary of the recipe" onChange={(e) => handleChange(e)} />
                    {errors.summary && (<p className={s.error}>{errors.summary}</p>)}
                </div>
                <div>
                    <label htmlFor="healthScore">HealthScore:  </label>
                    <input type="range" name="healthScore" min="0" max="5" step="1" key="healthScore" defaultValue={0} onChange={(e) => handleChange(e)} />
                    <label htmlFor="healthScore"> {input.healthScore / 20}</label>
                </div>
                <div >
                    <div >
                        <img src={input.image ? input.image : logo} alt={logo} className={s.imgForm} width="250px" height="250px"/>
                    </div>
                </div>
                <div>
                    <label htmlFor="image">Image:  </label>
                    <input type="text" name="image" value={input.image} key="image" onChange={(e) => handleChange(e)} placeholder="  Image URL..." />
                </div>

                <label htmlFor="">Type diets:</label>
                <div  >
                    <label htmlFor="ckbox" className={s.chk} >
                        <ul className={s.list}>

                            {typeDiest.map((el) => {
                                return (
                                    <li className={s.item}>
                                        <input type="checkbox" name={el} value={el} onChange={(e) => handleCheckBox(e)} className={s.box} />
                                        <label htmlFor="ckbox" className={s.t} >{el}</label>
                                    </li>
                                )
                            })}

                        </ul>
                    </label>
                </div>

                <label htmlFor="steps">Describe the steps:  </label>
                <div className={s.stp}>
                    <input type="text" value={pasos.step} name="steps" placeholder="  Describe the steps to follow in its preparation" onChange={(e) => handleSteps(e)} />
                    <button onClick={(e) => handleAddStep(e)} className={s.btna}>Add Step</button>
                    <button onClick={(e) => handleDeleteStep(e)} className={s.btnd} >Delete Step</button>
                    {input.steps.length >= 1 && input.steps.map((el) => (
                        <div className={s.description}>
                            <div>Step: {el.number}</div>
                            <div>Description: {el.step}</div>
                        </div>
                    ))}
                </div>

                <button type="submit" onClick={(e) => handleSubmit(e)} className={s.btncrt}>Create</button>
            </form>
        </div>
    )
}