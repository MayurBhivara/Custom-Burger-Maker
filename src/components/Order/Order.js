import React from 'react';
import classes from './Order.css'
const order = (props) => {
    const ingredients = [];
    for(let ingredientsName in props.ingredients){
        ingredients.push({ingredient:ingredientsName,amount:props.ingredients[ingredientsName]})
    }
    const ingredientOutput = ingredients.map(ig=>{
        return <span 
        style={{
            textTransform:"capitalize",
            display:'inline-block',
            margin:'0 8px',
            border: '1px solid #ccc',
            padding:'5px'
        }}
        key={ig.ingredient}>{ig.ingredient} ({ig.amount}) </span>
    })
    return (
        <div className={classes.Order} >
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price <strong>₹ {props.price.toFixed(2)}</strong></p>
            <p>Ordered {props.date}</p>
        </div>
    );
}
export default order;