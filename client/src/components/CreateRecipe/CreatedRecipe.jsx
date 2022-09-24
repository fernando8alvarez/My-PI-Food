import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipes } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

export default function CreateRecipes() {
    const dispatch = useDispatch();
    const diets = useSelector((state) => state.diets);

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    //EESTADOS LOCALES
    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        steps: [],
        image: "",
        diets: []
    });

    const [pasos, setPasos] = useState({
        id: 0,
        step: ""
    })

    //MANEJO DE EVENTOS
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
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
            id: input.steps.length + 1,
            step: e.target.value
        })
        console.log(pasos);
    }


    function handleAddStep(e) {
        e.preventDefault()
        setInput({
            ...input,
            steps: [...input.steps, pasos]
        });
        setPasos({
            ...pasos,
            step:""
        })
        console.log(input);
    }

    function handleDeleteStep(e){
        e.preventDefault();
       setInput({
        ...input,
        steps: input.steps.filter(el => input.steps.length !== el.id)
       })
    }


    return (
        <div>
            <Link to='/home'><button>Return</button></Link>
            <h1>Create your recipe</h1>
            <form action="">
                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input type="text" name="name" value={input.name} key="name" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="summary">Summary:</label>
                    <input type="text" name="summary" value={input.summary} key="summary" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="healthScore">HealthScore:</label>
                    <input type="range" name="healthScore" min="1" max="5" step="1" key="healthScore" onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="text" name="image" value={input.image} key="image" onChange={(e) => handleChange(e)} placeholder="Image URL..." />
                </div>
                <label htmlFor="">Type Diets:</label>
                <div>
                    <label htmlFor="ckbox">
                        <input type="checkbox" name="dairy free" value="dairy free" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">dairy free</label>
                        <input type="checkbox" name="gluten free" value="gluten free" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">gluten free</label>
                        <input type="checkbox" name="lacto ovo vegetarian" value="lacto ovo vegetarian" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">lacto ovo vegetarian</label>
                        <input type="checkbox" name="vegan" value="vegan" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">vegan</label>
                        <input type="checkbox" name="paleolithic" value="paleolithic" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">paleolithic</label>
                        <input type="checkbox" name="primal" value="primal" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">primal</label>
                        <input type="checkbox" name="whole 30" value="whole 30" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">whole 30</label>
                        <input type="checkbox" name="pescatarian" value="pescatarian" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">pescatarian</label>
                        <input type="checkbox" name="ketogenic" value="ketogenic" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">ketogenic</label>
                        <input type="checkbox" name="fodmap friendly" value="fodmap friendly" onChange={(e) => handleCheckBox(e)} /><label htmlFor="ckbox">fodmap friendly</label>
                    </label>
                </div>

                <label htmlFor="steps">Steps:</label>
                <div>
                    <input type="text" value={pasos.step} name="steps" onChange={(e) => handleSteps(e)} />
                    {input.steps.length >= 1 && input.steps.map((el) => (
                        <div>
                            <div>Step: {el.id}</div>
                            <div>Description: {el.step}</div>
                        </div>
                    ))}
                    <button onClick={(e) => handleAddStep(e)}>Add Step</button><button onClick={(e)=>handleDeleteStep(e)}>Delete Step</button>
                </div>

                <button type="submit">Create</button>
            </form>
        </div>
    )
}